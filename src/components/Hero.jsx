import { motion } from "framer-motion";
import Instagram from "../assets/instagram.png";
import GitHub from "../assets/github.png";
import Linkedin from "../assets/linkedin.png";
import RobotCanvas from "./canvas/Robot";

const Hero = () => {
  return (
    <section className="w-full h-[100svh] flex flex-col lg:flex-row justify-center items-center">
      <div className="flex flex-col items-center md:h-[50%] md:justify-center px-6 md:gap-10 gap-2 md:p-6 lg:p-6 mt-24 lg:mt-0 lg:gap-4 lg:w-full max-[327px]:mt-16">
        <h1 className="text-white font-black text-4xl max-[350px]:text-center max-[360px]:text-md">
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
            <img src={Linkedin} className="w-[30px] h-[30px] z-10" />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/iTzRusso10"
          >
            <img src={GitHub} className="w-[30px] h-[30px] z-10" />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-80 md:h-96">
        <RobotCanvas />
      </div>
      <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary absolute p-2 bottom-3 lg:hidden">
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
