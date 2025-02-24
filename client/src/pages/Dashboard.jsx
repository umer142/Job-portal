/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  // Logout Function
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
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Overlay (for mobile sidebar) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 bg-white shadow-md min-h-screen p-5 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 md:hidden text-2xl"
          onClick={() => setSidebarOpen(false)}
        >
          <FiX />
        </button>

        <div className="flex flex-col items-center gap-4 mt-8">
          {companyData && (
            <>
              <img
                className="w-16 h-16 border border-gray-200 rounded-full"
                src={companyData.image}
                alt="Company Logo"
              />
              <p className="text-lg font-semibold text-gray-800">
                Welcome, {companyData.name}
              </p>
            </>
          )}
        </div>

        <nav className="mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md w-full text-gray-800 hover:bg-gray-200 ${
                isActive && "bg-blue-100 border-r-4 border-blue-500"
              }`
            }
            to={"/dashboard/manage-jobs"}
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5 mr-2" />
            Manage Jobs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md w-full text-gray-800 hover:bg-gray-200 ${
                isActive && "bg-blue-100 border-r-4 border-blue-500"
              }`
            }
            to={"/dashboard/view-applications"}
          >
            <img
              src={assets.person_tick_icon}
              alt=""
              className="w-5 h-5 mr-2"
            />
            View Applications
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-10 p-2 w-full text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="absolute top-5 left-5 md:hidden z-50 text-2xl text-gray-800"
        onClick={() => setSidebarOpen(true)}
      >
        <FiMenu />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
