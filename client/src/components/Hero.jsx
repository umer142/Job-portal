/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container mx-auto px-4 my-10">
      <div className="bg-gradient-to-r from-green-800 to-green-950 text-white py-16 text-center rounded-xl max-w-5xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Emperi Staffing Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm sm:text-base font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-md text-gray-600 max-w-xl mx-auto p-2 space-y-3 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center w-full border rounded-md p-2">
            <img className="h-5 mr-2" src={assets.search_icon} alt="Search" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="text-sm w-full outline-none"
            />
          </div>
          <div className="flex items-center w-full border rounded-md p-2">
            <img
              className="h-5 mr-2"
              src={assets.location_icon}
              alt="Location"
            />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="text-sm w-full outline-none"
            />
          </div>
          <button
            onClick={onSearch}
            className="w-full sm:w-auto px-6 py-3 font-medium transition bg-indigo-500 rounded-md text-white hover:bg-indigo-600"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
