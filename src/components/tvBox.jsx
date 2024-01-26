import React from "react";

function TvBox({ name, onSelect, icon }) {
  return (
    <>
      <div className="bg-white w-72 h-12 rounded-xl shadow-lg m-5 flex">
        <div className="m-2 w-full flex">
          <div className="imgArea w-1/5">
            <img
              src={icon}
              alt={name}
              className="flex items-center justify-center h-full object-contain w-full"
            />
          </div>
          <div className="flex w-4/5 items-center">
            <h1 className="text-xs lg:text-sm  font-semibold w-3/4 ml-8">
              {name}
            </h1>
            <div onClick={() => onSelect()} className="w-1/4 ">
              <i className="fa-solid fa-circle-play transition-transform transform hover:scale-125"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TvBox;
