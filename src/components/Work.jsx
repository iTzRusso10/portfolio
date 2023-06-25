import React from "react";
import resize from "../assets/resize.png";
import video from "../video/minigames-react-video.mp4";
import poster from "../img/poster-video.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Work = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Cambia a false se vuoi che l'animazione si attivi ogni volta che l'elemento entra nella vista
    threshold: 0.2, // Cambia in base a quando vuoi che l'animazione si attivi (0.1 indica che l'animazione si attiverà quando almeno il 10% dell'elemento è visibile)
  });

  const variants = {
    hidden: { opacity: 0, y: 300 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: { opacity: 0, y: 100, transition: { duration: 0.5 } },
  };

  return (
    <div ref={ref}>
      <motion.div
        className="z-[1] flex w-full flex-col justify-center gap-5 px-6 py-12"
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-black text-[#B205BB] ">
            <span className="text-4xl text-white">My</span> Work
          </h1>
          <p className="text-center text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            possimus inventore nam cum error veniam, magni veritatis id.
            Expedita, eaque repudiandae. Doloremque exercitationem architecto,
            sint similique quos eligendi ullam rerum?
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
      </motion.div>
    </div>
  );
};

export default Work;
