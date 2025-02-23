/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  //   Function to logout for company
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen ">
      {/* Navbar For recruiter Panal  */}
      <div className="shadow ">
        <div className="px-5 flex justify-between items-center">
          <img
            className="max-sm:w-32 h-22 scale-200  cursor-pointer "
            src={assets.logo}
            alt=""
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name} </p>
              <div className="relative group">
                <img
                  className="w-8 border border-gray-200 rounded-full"
                  src={companyData.image}
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-14">
                  <ul className="list-none m-0 p-0 bg-white rounded-md border border-gray-200 text-sm ">
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer pr-10 "
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left Sidebar with options to add jobs , mange jobs , views jobs , view applcations */}
        <div className="inline-block min-h-screen border-gray-200  border-r-1 ">
          <ul className="flex flex-col items-center pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-2 w-full hover-bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"./manage-jobs"}
            >
              <img src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                ` flex items-center p-3 sm:px-6 gap-2 w-full hover-bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"./view-applications"}
            >
              <img src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
