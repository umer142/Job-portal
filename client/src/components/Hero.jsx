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
    <div className="container max-sm:flex  max-sm:flex-col max-sm:justify-center max-sm:items-center 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-green-800 max-sm:w-[90vw] to-green-950 text-white py-16 text-center mx-2 rounded-xl ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          <span className="bg-yellow-200   py-2 px-5 mx-2  rounded-xl max-md:text-lg max-sm:text-xs text-black font-extrabold">
            Emperi Staffing
          </span>
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center bg-white rounded max-sm:w-xs text-gray-600 max-w-xl pl-4 mx-4  sm:mx-auto   ">
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2  rounded outline-none w-full "
            />
          </div>
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="max-sm:text-xs  p-2 rounded outline-none w-full "
            />
          </div>

          <button
            onClick={onSearch}
            className="relative flex items-center px-8 py-3 overflow-hidden font-medium transition-all m-1 bg-indigo-500 rounded-md group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              {" "}
              Search
            </span>
          </button>
        </div>
      </div>

      {/* #################  */}
    </div>
  );
};

export default Hero;
