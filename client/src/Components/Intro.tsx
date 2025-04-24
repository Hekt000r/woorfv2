/******************
 * Intro.tsx
 * The "welcome" screen in the homepage
 *******************/

/* Imports */
import WoorfLogo from "../assets/woorf-logo.svg?react";

function Intro() {
  return (
    <>
      <div className="shadow-2xl w-[45rem] h-[20rem] rounded-2xl mt-8 flex flex-col">
        <div className="flex justify-center">
          <WoorfLogo className="mt-4" />
        </div>
        <h1 className="text-center text-3xl font-semibold">The hub for free and open source software</h1>
        <p className="text-center text-xl">No ads, no waiting, no malware, instant downloads and access to hundreds of free-and-open-source  programs</p>
      </div>
    </>
  );
}

export default Intro;
