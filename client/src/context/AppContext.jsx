/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { jobsData } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)

//   Function to  Fetch Jobs Data

const fetchJobs = async () => {
 setJobs(jobsData)          
}

useEffect(() =>{
 fetchJobs()
},[])

  const value = {
    setSearchFilter,
    searchFilter,

    isSearched,
    setIsSearched,

    jobs,
    setJobs,
    
    showRecruiterLogin,setShowRecruiterLogin
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
