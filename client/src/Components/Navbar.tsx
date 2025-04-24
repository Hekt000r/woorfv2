/* Imports */
import WoorfLogo from "../assets/woorf-logo.svg?react";
import { FaSearch } from "react-icons/fa";
import { FaGear, FaCircleInfo } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";


function Navbar() {
  return (
    <>
      <div className="shadow-lg w-full flex flex-row h-16">
        {/* Logo  */}
        <a href="" className="btn btn-ghost m-2 justify-center ">
          <WoorfLogo id="woorf-logo " className="w-32 h-18" />
        </a>

        {/* The div containing menu items */}
        <div className="flex w-[70%] justify-center items-center m-auto h-full mr-[14%]">
          {/* Menu items */}

          {/* Home */}
          <div className="btn btn-ghost h-full max-w-64 m-2 text-lg">
            <IoHome className="w-5 h-5 m-1" /> Home
          </div>

          {/* Software */}
          <div className="btn btn-ghost h-full max-w-64 m-2 text-lg">
            <FaGear className="w-5 h-5 m-1" /> Software
          </div>

          {/* Alternative Finder */}
          <div className="btn btn-ghost h-full max-w-64 m-2 text-lg">
            <FaSearch className="w-5 h-5 m-1" /> Alternative Finder
          </div>

          {/* About */}
          <div className="btn btn-ghost h-full w-36 m-2 text-lg">
            <FaCircleInfo className="w-5 h-5" /> About
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
