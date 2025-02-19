/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {

 const {setSearchFilter, setIsSearched} = useContext(AppContext)
  
 const titleRef = useRef(null)
 const locationRef = useRef(null)

 const onSearch = () => {
  
  setSearchFilter({
    title: titleRef.current.value,
    location: locationRef.current.value
  })
  setIsSearched(true)
  
 }

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-green-800 to-green-950 text-white py-16 text-center mx-2 rounded-xl ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          <span className="bg-yellow-200   py-2 px-5 mx-2  rounded-xl max-md:text-lg max-sm:text-xs text-black font-extrabold">Emperi Staffing</span>
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center bg-white rounded text-gray-600 max-w-xl pl-4 mx-4  sm:mx-auto   ">
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2  rounded outline-none w-full "
            />
          </div>
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input  ref= {locationRef}
              type="text"
              placeholder="Location"
              className="max-sm:text-xs  p-2 rounded outline-none w-full "
            />
          </div>

          <button onClick={onSearch} className="relative flex items-center px-8 py-3 overflow-hidden font-medium transition-all m-1 bg-indigo-500 rounded-md group">
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

    <div className="border justify-center items-center border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex ">
      <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
      
<div
  className="div h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0"
>
  <div
    className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#06641d] group-hover:scale-[800%] duration-500 z-[-1] op"
  ></div>

  <button
    className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-[white] duration-500"
  >
   
    <i className="fa-solid fa-arrow-right"></i>
  </button>

  <h1
    className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]"
  >
  Find Work. Build Success.
  </h1>
</div>
<div
  className="div h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0"
>
  <div
    className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#119e0c] group-hover:scale-[800%] duration-500 z-[-1] op"
  ></div>

  <button
    className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-[white] duration-500"
  >
    
    <i className="fa-solid fa-arrow-right"></i>
  </button>

  <h1
    className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]"
  >
   Connecting Talent with Opportunity.
  </h1>
</div>
<div
  className="div h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0"
>
  <div
    className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#106d04] group-hover:scale-[800%] duration-500 z-[-1] op"
  ></div>

  <button
    className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-[white] duration-500"
  >
   
    <i className="fa-solid fa-arrow-right"></i>
  </button>

  <h1
    className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]"
  >
Step Into Your Future Today
  </h1>
</div>
<div
  className="div h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0"
>
  <div
    className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#068a27] group-hover:scale-[800%] duration-500 z-[-1] op"
  ></div>

  <button
    className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-[white] duration-500"
  >
    
    <i className="fa-solid fa-arrow-right"></i>
  </button>

  <h1
    className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]"
  >
  Your Dream Job, One Click Away!
  </h1>
</div>

      </div>
    </div>
    </div>
  );
};

export default Hero;
