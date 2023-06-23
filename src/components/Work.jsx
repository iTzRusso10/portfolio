import React from "react";
import resize from "../assets/resize.png";

const Work = () => {
  return (
    <div className="w-full p-5 flex flex-col justify-center gap-5 z-[1]">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-[#B205BB] text-4xl font-black ">
          <span className="text-white text-4xl">My</span> Work
        </h1>
        <p className="text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
          possimus inventore nam cum error veniam, magni veritatis id. Expedita,
          eaque repudiandae. Doloremque exercitationem architecto, sint
          similique quos eligendi ullam rerum?
        </p>
      </div>
      <video controls className="rounded-lg">
        <source src="./Videos/video1.mp4" type="video/mp4" />
      </video>
      <div className="flex gap-2 p-3 rounded-md  bg-[#B205BB] justify-center items-center mx-auto hover:bg-[#81028a] active:bg-[#67026e]">
      <img src={resize} className="w-4 h-4 " />
        <button className="text-white">
          GitHub Repository
        </button>
      </div>
    </div>
  );
};

export default Work;
