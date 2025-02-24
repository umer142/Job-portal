/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visiblity`,
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/company/jobs/delete/${jobId}`,
        {
          headers: { token: companyToken },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-3 border-b border-gray-200 hidden md:table-cell">
                #
              </th>
              <th className="py-2 px-3 border-b border-gray-200">Job Title</th>
              <th className="py-2 px-3 border-b border-gray-200 hidden sm:table-cell">
                Date
              </th>
              <th className="py-2 px-3 border-b border-gray-200 hidden lg:table-cell">
                Location
              </th>
              <th className="py-2 px-3 border-b border-gray-200 text-center">
                Applications
              </th>
              <th className="py-2 px-3 border-b border-gray-200">Visible</th>
              <th className="py-2 px-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-3 border-b border-gray-300 hidden md:table-cell">
                  {index + 1}
                </td>
                <td className="py-2 px-3 border-b border-gray-300">
                  {job.title}
                </td>
                <td className="py-2 px-3 border-b border-gray-300 hidden sm:table-cell">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-3 border-b border-gray-300 hidden lg:table-cell">
                  {job.location}
                </td>
                <td className="py-2 px-3 border-b border-gray-300 text-center">
                  {job.applicants}
                </td>
                <td className="py-2 px-3 border-b border-gray-300">
                  <input
                    onChange={() => changeJobVisibility(job._id)}
                    className="scale-125 ml-4"
                    type="checkbox"
                    checked={job.visible}
                  />
                </td>
                <td className="py-2 px-3 border-b border-gray-300 text-center">
                  <button onClick={() => handleDeleteJob(job._id)}>
                    <img
                      className="hover:bg-red-400 hover:text-white p-2 rounded-full w-6 h-6"
                      src={assets.cross_icon}
                      alt="Delete"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
