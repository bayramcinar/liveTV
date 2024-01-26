import React from "react";
import logo from "../images/logo.jpg";

function TvBox({ name, onSelect, icon }) {
  return (
    <>
      <div className="bg-white w-72 h-12 rounded-xl shadow-lg m-5 flex">
        <div className="m-2 w-full flex justify-around">
          <div className="imgArea w-1/5">
            <img
              src={icon}
              alt={name}
              className="flex items-center justify-center h-full object-contain w-full"
            />
          </div>
          <div className="flex justify-around w-4/5 items-center">
            <h1 className="text-sm font-semibold">{name}</h1>
            <div onClick={() => onSelect()}>
              <i className="fa-solid fa-circle-play transition-transform transform hover:scale-125"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TvBox;
