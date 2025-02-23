/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-3 mt-20 flex justify-between items-center gap-4">
      <img className="" width={160} src={assets.logo} alt="" />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        All right reserved. Copyright @Job-Emperi Staffing
      </p>
      <div className="flex gap-2.5">
        <img
          className="hover:bg-green-300   rounded-full"
          width={38}
          src={assets.facebook_icon}
          alt=""
        />
        <img
          className="hover:bg-green-300   rounded-full"
          width={38}
          src={assets.instagram_icon}
          alt=""
        />
        <img
          className="hover:bg-green-300   rounded-full"
          width={38}
          src={assets.twitter_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
