/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { data } from "react-router-dom";

const ViewApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  //    Function to fetch company job application data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
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
        return; // Prevents further execution
      }

      const response = await axios.put(
        `${backendUrl}/api/company/applicants/update-status/${applicationId}`,
        { status }, // Pass data correctly
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(
        error.response?.data?.message || "There was an error changing status!"
      );
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  console.log(applicants);

  return applicants ? (
    applicants.length === 0 ? (
      <div></div>
    ) : (
      <div className="container mx-auto p-4">
        <div>
          <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-gray-700 ">
                    <td className="py-2 px-4 border-b text-center ">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b text-center flex items-center ">
                      <img
                        className="w-10 h-10 mr-3 max-sm:hidden "
                        src={applicant.userId.image}
                        alt=""
                      />
                      <span>{applicant.userId.name}</span>
                    </td>
                    <td className="py-2 px-4 border-b text-center max-sm:hidden ">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 px-4 border-b text-center max-sm:hidden ">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        className="bg-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                      >
                        Resume <img src={assets.resume_download_icon} alt="" />
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b relative ">
                      <div className="relative inline-block text-left  group">
                        <button className="text-gray-500 action-button">
                          ...
                        </button>
                        <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateApplicationStatus({
                                status: "Accepted",
                                applicationId: applicant._id,
                              })
                            }
                            className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
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
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
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
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplication;
