import { motion } from "framer-motion";
import Instagram from "../assets/instagram.png";
import GitHub from "../assets/github.png";
import Linkedin from "../assets/linkedin.png";
import RobotCanvas from "./canvas/Robot";

const Hero = () => {
  return (
    <section className="flex h-[100svh] w-full flex-col items-center justify-center md:justify-start md:h-full lg:flex-row lg:h-[100svh]">
      <div className="mt-28 flex flex-col items-center gap-2 px-6 max-[327px]:mt-16  md:justify-start md:gap-10 md:p-6 lg:mt-0 lg:w-full lg:gap-4 lg:p-6">
        <h1 className="max-[350px]:text-md text-4xl font-black text-white max-[350px]:text-center p-2">
          GIUSEPPE <span className="text-[#B205BB]"> RUSSO</span>
        </h1>
        <p className="text-center text-[12px] text-white md:px-6 md:text-base lg:px-12 lg:text-base">
          Sono un Junior React Developer con un solido background, con discrete
          abilità in Three.js. Con il mio impegno e la mia creatività, cerco di
          trasformare le idee in realtà. La mia missione è esplorare l'universo
          del codice, ricercare l'eccellenza e creare esperienze digitali
          straordinarie. Lavoro per migliorare ogni giorno, affrontando nuove
          sfide con entusiasmo. Credo fermamente che l'unico limite sia il cielo
          quando si tratta di sviluppo web.
        </p>
        <div className="flex gap-6">
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
      <div className="h-[400px] w-full">
        <RobotCanvas />
      </div>
      <div className="flex border-secondary relative bottom-3 h-[70px] w-[35px] rounded-3xl border-4 p-2 lg:hidden">
        <motion.div
          animate={{
            y: [0, 23, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="mb-.5 h-3 w-3 rounded-full bg-white "
        />
      </div>
    </section>
  );
};

export default Hero;
