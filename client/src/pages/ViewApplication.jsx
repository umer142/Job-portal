/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateApplicationStatus = async ({ status, applicationId }) => {
    try {
      if (!["Accepted", "Rejected"].includes(status)) {
        toast.error("Invalid status, it must be 'Accepted' or 'Rejected'");
        return;
      }

      const response = await axios.put(
        `${backendUrl}/api/company/applicants/update-status/${applicationId}`,
        { status },
        {
          headers: { token: companyToken },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCompanyJobApplications();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status!");
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    <div className="container mx-auto p-4">
      {applicants.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Job Title
                </th>
                <th className="py-2 px-4 text-left hidden md:table-cell">
                  Location
                </th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr
                    key={index}
                    className="border-b text-gray-700 text-center"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        className="w-8 h-8 rounded-full hidden sm:block"
                        src={applicant.userId.image}
                        alt="User"
                      />
                      <span>{applicant.userId.name}</span>
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 px-4 hidden md:table-cell">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm flex items-center gap-2"
                      >
                        Resume <img src={assets.resume_download_icon} alt="" />
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <div className="relative inline-block">
                        <button className="text-gray-500 hover:text-gray-700">
                          ⋮
                        </button>
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow hidden group-hover:block">
                          <button
                            onClick={() =>
                              handleUpdateApplicationStatus({
                                status: "Accepted",
                                applicationId: applicant._id,
                              })
                            }
                            className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateApplicationStatus({
                                status: "Rejected",
                                applicationId: applicant._id,
                              })
                            }
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default ViewApplication;
