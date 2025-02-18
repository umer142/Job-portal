/* eslint-disable no-constant-condition */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="text-center mx-18 mt-5"><h1 className="text-xl font-bold text-white bg-blue-400 p-2 rounded-xl">Upload your resume in PDF format along with a screenshot of your JazzCash transaction.
          <br />  <span className="text-lg text-white bg-red-400 p-1 rounded  ">Otherwise Your application Did not Accept</span></h1>
         <div className="bg-green-400  rounded font-bold text-xl p-4 text-white inline-block mt-3">
         <br />  <span>JazzCash # 0300000000</span>
          <br /> <span>Easypasa # 0300000000</span>
          <br /><span>Meezan AC # 02120100002102</span>
          </div>
          </div>
          <div></div>
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 ">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg "
                href="#"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2 "
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4 " >Jobs Applied</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left max-sm:hidden ">Company</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left max-sm:hidden ">Job Title</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left max-sm:hidden ">Loaction</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left  max-sm:hidden">Date</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left  max-sm:hidden">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job,index)=> true ? (
              <tr>
                 <td className="py-3 px-4 flex items-center gap-2 border-b border-gray-100">
                  <img className="w-8 h-8" src={job.logo} alt="" />
                  {job.company}
                 </td>
                 <td className="py-2 px-4 border-b border-gray-100">{job.title}</td>
                 <td  className="py-2 px-4 border-b border-gray-100 max-sm:hidden">{job.location}</td>
                 <td  className="py-2 px-4 border-b border-gray-100 max-sm:hidden">{moment(job.date).format('ll')}</td>
                 <td  className="py-2 px-4 border-b border-gray-100">
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ?   'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded `}>{job.status}</span></td>
              </tr>
            ) : (null) )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
