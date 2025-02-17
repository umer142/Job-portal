/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handelCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handelLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    );
  };
  useEffect(() =>{
    
    const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
    const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
    const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    const matchesLocationSearch = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
    
    const newFilteredJobs = jobs.slice().reverse().filter(job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesLocationSearch(job))
      
    setFilteredJobs(newFilteredJobs)
    setCurrentPage(1)
  } ,[jobs, selectedCategories, selectedLocations, searchFilter])

  return (
    <div className="container 2xl:px-20 mx-auto flex gap-8 max:lg:space-y-8 py-8">
      <div className="ml-6">
        <div className="w-full lg:w-1/4 bg-white px-4">
          {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title !== "" && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, title: "" }))}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location !== "" && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-green-50 border border-green-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, location: "" }))}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 m-5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filter"}
        </button>
        <div className="flex max-md:flex-wrap gap-4">
          <div className={showFilter ? "" : "max-lg:hidden"}>
            <div>
              <h4 className="font-medium text-lg py-4">Search by Categories</h4>
              <ul className="space-y-4 text-gray-600">
                {JobCategories.map((Category, index) => (
                  <li className="flex gap-3 items-center" key={index}>
                    <input
                      className="scale-125"
                      type="checkbox"
                      onChange={() => handelCategoryChange(Category)}
                      checked={selectedCategories.includes(Category)}
                    />
                    {Category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-14">
              <h4 className="font-medium text-lg py-4">Search by Location</h4>
              <ul className="space-y-4 text-gray-600">
                {JobLocations.map((location, index) => (
                  <li className="flex gap-3 items-center" key={index}>
                    <input
                      className="scale-125"
                      type="checkbox"
                      onChange={() => handelLocationChange(location)}
                      checked={selectedLocations.includes(location)}
                    />
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
    {/* JOB listing  */}
          <section className="w-full md:mr-5 lg:w-3/4 text-gray-800 max-lg:px-4">
            <h3 className="font-medium text-3xl py-2" id="job-list">
              Latest Jobs
            </h3>
            <p className="mb-8">Get your desired job from top companies</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
{/* Pagination  */}
            {filteredJobs.length > 0 && (
              <div className="flex items-center justify-center space-x-2 mt-10">
                <a href="#job-list">
                  <img
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    src={assets.left_arrow_icon}
                    alt="error"
                  />
                </a>
                {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                  <a  href="#job-list" key={index}>
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center border border-gray-100 rounded 
        ${currentPage === index + 1 ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}
                    >
                      {index + 1}
                    </button>
                  </a>
                ))}
                <a href="job-list">
                  <img
                    onClick={() =>
                      setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))
                    }
                    src={assets.right_arrow_icon}
                    alt="error"
                  />
                </a>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
