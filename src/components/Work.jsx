import React from "react";
import resize from "../assets/resize.png";
import video from "../video/minigames-react-video.mp4";
import poster from "../img/poster-video.png";

const Work = () => {
  return (
    <div className="z-[1] flex w-full flex-col justify-center gap-5 px-6 py-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-black text-[#B205BB] ">
          <span className="text-4xl text-white">My</span> Work
        </h1>
        <p className="text-center text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
          possimus inventore nam cum error veniam, magni veritatis id. Expedita,
          eaque repudiandae. Doloremque exercitationem architecto, sint
          similique quos eligendi ullam rerum?
        </p>
      </div>
      <video controls className="rounded-lg" preload="auto" poster={poster}>
        <source src={video} type="video/mp4" />
      </video>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/iTzRusso10/Minigames-React"
        className="flex"
      >
        <div className="mx-auto flex cursor-pointer items-center justify-center  gap-2 rounded-md bg-[#B205BB] p-3 hover:bg-[#81028a] active:bg-[#67026e]">
          <img src={resize} className="h-4 w-4 " />
          <button className="text-white">GitHub Repository</button>
        </div>
      </a>
    </div>
  );
};

export default Work;
