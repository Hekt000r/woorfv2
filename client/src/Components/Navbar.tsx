/* Imports */
import WoorfLogo from "../assets/woorf-logo.svg?react";
import { FaSearch } from "react-icons/fa";
import { FaGear, FaCircleInfo } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaTools } from "react-icons/fa";

function Navbar() {

  let pathname = window.location.pathname

  /* Commonly used styles */
  const activePageButtonStyle = `border-0 !border-b-4 border-primary text-primary pt-1`
  const activePageIconStyle = `fill-primary`

  /* Check to see if the supplied path is the current pathname, so you can add visual feedback. */
  const isActivePage = (path: string) => pathname === path ? true : false
  return (
    <>
      <div className="shadow-lg w-full flex flex-row h-16">
        {/* Logo  */}
        <a href="/" className="btn btn-ghost m-2 justify-center ">
          <WoorfLogo id="woorf-logo " className="w-32 h-18" />
        </a>

        {/* The div containing menu items */}
        <div className="flex w-[70%] justify-center items-center m-auto h-full mr-[14%]">
          {/* Menu items */}

          {/* Home */}
          <a href="/" className={`btn btn-ghost h-full max-w-64 m-2 text-lg ${isActivePage(`/`) ? activePageButtonStyle : ``}`}>
            <IoHome className={`${isActivePage(`/`) ? activePageIconStyle : ``}`}/> Home
          </a>

          {/* Software */}
          <a href="software" className={`btn btn-ghost h-full max-w-64 m-2 text-lg ${isActivePage(`/software`) ? activePageButtonStyle : ``}`}>
            <FaGear className={`w-5 h-5 m-1 ${isActivePage(`/software`) ? activePageIconStyle : ``} `} /> Software
          </a>

          {/* Alternative Finder */}
          <a href="altfinder" className={`btn btn-ghost h-full max-w-64 m-2 text-lg ${isActivePage(`/altfinder`) ? activePageButtonStyle : ``}`}>
            <FaSearch className={`w-5 h-5 m-1 ${isActivePage(`/altfinder`) ? activePageIconStyle : ``}`} /> Alternative Finder
          </a>

          {/* About */}
          <a href="about" className={`btn btn-ghost h-full w-36 m-2 text-lg ${isActivePage(`/about`) ? activePageButtonStyle : ``}`}>
            <FaCircleInfo className={`w-5 h-5 ${isActivePage(`/about`) ? activePageIconStyle : ``}`} /> About
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
