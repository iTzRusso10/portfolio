import React from "react";

const Work = () => {


  return (
    <div
      className="w-full p-5 flex flex-col justify-center gap-5"
    >
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
    </div>
  );
};

export default Work;
