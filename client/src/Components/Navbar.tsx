import React from "react";
import WoorfLogo from "../assets/woorf-logo.svg?react"
function Navbar() {
    return (
        <>
        <div className="shadow-lg w-full flex flex-row">
            <WoorfLogo id="woorf-logo" className="w-32 h-16 m-2"/>
        </div>
        </>
    )
}

export default Navbar