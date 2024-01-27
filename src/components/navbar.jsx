import React from "react";
import "../style/navbar.css";
import moon from "../images/moon-icon.png";
import sun from "../images/sun-icon.png";

function Navbar({ isLightMode, handleToggle }) {
  return (
    <div
      className={`w-full 
      ${isLightMode ? "bg-gray text-black" : "bg-darkBg text-white"} 
      flex items-center justify-center`}
    >
      <h1 className="w-1/3"></h1>
      <h1 className="font-medium text-lg text-center cursor-default p-3 w-1/3">
        Canlı TV
      </h1>
      <input type="checkbox" id="switch" onChange={handleToggle} />
      <div className="switch-btn w-1/3 flex ml-auto mr-2">
        <label htmlFor="switch">
          <div className="icons">
            <img src={sun} alt="sun" />
            <img src={moon} alt="moon" />
          </div>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
