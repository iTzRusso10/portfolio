import { motion } from "framer-motion";
import GitHub from "../assets/github.png";
import Linkedin from "../assets/linkedin.png";
import RobotCanvas from "./canvas/Robot";
import Blob from "../assets/blob.svg";
import BlobMobile from "../assets/blob-mobile.svg";
const Hero = () => {
  return (
    <section className=" flex h-full w-full flex-col items-center justify-center md:h-full md:justify-start lg:h-[100svh] lg:flex-row lg:justify-center">
      <img
        src={Blob}
        className="absolute h-full w-full object-cover max-[700px]:hidden"
      />
      <img
        src={BlobMobile}
        className="absolute h-full w-full object-cover lg:hidden"
      />
      <div className=" z-[100] mt-[6rem] flex flex-col items-center gap-1 px-6 max-[327px]:mt-16  md:justify-start md:gap-10 md:p-6 lg:mt-0 lg:w-full lg:gap-4 lg:p-6">
        <h1 className="max-[350px]:text-md text-center text-4xl font-black text-white max-[350px]:text-center">
          GIUSEPPE <span className="text-[#B205BB]"> RUSSO</span>
        </h1>
        <p className="text-center text-[13px] text-white md:px-6 md:text-base lg:px-12 lg:text-base">
          Sono un Web Developer con un solido background, con discrete abilità
          in Three.js. Con il mio impegno e la mia creatività, cerco di
          trasformare le idee in realtà. La mia missione è esplorare
          l&apos;universo del codice, ricercare l&apos;eccellenza e creare
          esperienze digitali straordinarie. Lavoro per migliorare ogni giorno,
          affrontando nuove sfide con entusiasmo. Credo fermamente che
          l&apos;unico limite sia il cielo quando si tratta di sviluppo web.
        </p>
        <div className="z-[100] flex gap-6">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/giuseppe-russo-792900264/"
          >
            <img src={Linkedin} className="z-10 h-[30px] w-[30px]" />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/iTzRusso10"
          >
            <img src={GitHub} className="z-10 h-[30px] w-[30px]" />
          </a>
        </div>
      </div>
      <div className="md:-[h-50%] z-[100] h-[235px] w-[80%] lg:h-[50%] lg:w-[100%]">
        <RobotCanvas />
      </div>
      <div className="z-[100] mt-3 flex flex-col justify-center p-2">
        <div className=" border-secondary bottom-15 h-[70px] w-[35px] rounded-3xl border-4 p-2 lg:hidden">
          <motion.div
            animate={{
              y: [0, 34, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="mb-.5 h-3 w-3 rounded-full bg-white "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
