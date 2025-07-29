import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-[#ef9489] text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4 ml-5">
          <a href="#" className="hover:text-gray-500">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-500">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-500">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center ml-3 mr-3 flex-grow">
          <span>Your new favorite t-shirt? Coming soon to your home 🚀</span>
        </div>
        <div className="mr-5 text-sm hidden md:block">
          <a href="mob:+91 9876623096" className="hover:text-gray-300">
            +91 (98766 23096)
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
