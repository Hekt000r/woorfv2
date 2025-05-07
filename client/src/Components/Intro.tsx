/******************
 * Intro.tsx
 * The "welcome" screen in the homepage
 *******************/

/* Imports */
import WoorfLogo from "../assets/woorf-logo.svg?react";
import { FaArrowCircleRight } from "react-icons/fa";

function Intro() {
  return (
    <>
      <div className="shadow-2xl w-[45rem] h-[20rem] rounded-2xl mt-8 flex flex-col">
        <div className="flex justify-center">
          <WoorfLogo className="mt-4" />
        </div>
        <h1 className="text-center text-3xl font-semibold text-montserrat">The hub for free and open source software</h1>
        <p className="text-center text-xl text-montserrat">No ads, no waiting, no malware, instant downloads and access to hundreds of free-and-open-source  programs</p>

        <div className="flex justify-center mt-8">
          <a className="flex justify-center items-center btn btn-ghost mr-8 shadow-md rounded-xl" href=""><FaArrowCircleRight className="w-7 h-7 mr-2 " />Learn more</a>
          <a className="flex justify-center items-center btn btn-ghost mr-8 shadow-md rounded-xl" href=""><FaArrowCircleRight className="w-7 h-7 mr-2" />Software</a>
          <a className="flex justify-center items-center btn btn-ghost shadow-md rounded-xl" href=""><FaArrowCircleRight className="w-7 h-7 mr-2" />Alternative Finder</a>
        </div>
      </div>
    </>
  );
}

export default Intro;
