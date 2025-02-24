/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Logout function
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Navbar */}
      <div className="shadow w-full md:w-auto py-4 px-5 flex justify-between items-center md:justify-start bg-white">
        {companyData && (
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <p className="hidden sm:block">Welcome, {companyData.name}</p>
            <div className="relative group">
              <img
                className="w-10 h-10 border border-gray-200 rounded-full"
                src={companyData.image}
                alt="Profile"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="bg-white rounded-md border border-gray-200 text-sm">
                  <li
                    onClick={logout}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`absolute md:relative md:translate-x-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:w-64 w-3/4 h-screen bg-white border-r border-gray-200 z-20 shadow-lg md:shadow-none`}
      >
        <ul className="flex flex-col pt-5 text-gray-800">
          <NavLink
            className={({ isActive }) =>
              `flex items-center p-4 gap-2 hover:bg-gray-100 ${
                isActive && "bg-blue-100 border-r-4 border-blue-500"
              }`
            }
            to={"./manage-jobs"}
          >
            <img src={assets.home_icon} alt="Manage Jobs" className="w-6 h-6" />
            <p className="hidden sm:block">Manage Jobs</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center p-4 gap-2 hover:bg-gray-100 ${
                isActive && "bg-blue-100 border-r-4 border-blue-500"
              }`
            }
            to={"./view-applications"}
          >
            <img
              src={assets.person_tick_icon}
              alt="View Applications"
              className="w-6 h-6"
            />
            <p className="hidden sm:block">View Applications</p>
          </NavLink>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
