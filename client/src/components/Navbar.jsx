/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow w-full bg-white fixed top-0 left-0 z-50">
      <div className="container px-4 lg:px-20 mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="h-16 cursor-pointer scale-220 mx-2 max-sm:h-12"
          src={assets.logo}
          alt="Logo"
        />

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/applications" className="hover:underline">
                Applied Jobs
              </Link>
              <p>|</p>
              <p className="hidden md:block">
                Hi, {user.firstName} {user.lastName}
              </p>
              <UserButton />
            </>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="py-2 px-4 rounded-full border border-black hover:bg-gray-100"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => openSignIn()}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 pb-4 bg-white shadow-md">
          {user ? (
            <>
              <Link to="/applications" className="hover:underline">
                Applied Jobs
              </Link>
              <p>|</p>
              <p>
                Hi, {user.firstName} {user.lastName}
              </p>
              <UserButton />
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="py-2 px-4 rounded-full border border-black hover:bg-gray-100"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => openSignIn()}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
