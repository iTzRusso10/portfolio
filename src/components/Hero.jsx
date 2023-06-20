import ReactLogoCanvas from "./canvas/ReactLogo";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="w-full h-[100dvh] flex flex-col lg:flex-row justify-center items-center">
      <div className="flex flex-col items-center md:h-[50%] md:justify-center  px-6 md:gap-10 gap-4 md:p-6 lg:p-6 mt-24 lg:mt-0 lg:w-full max-[327px]:mt-16">
        <h1 className="text-white font-black text-4xl max-[327px]:text-center">Giuseppe <span className="text-[#B205BB]">Russo</span></h1>
        <p className="text-white text-center md:text-2xl md:px-6 text-sm lg:text-md lg:px-12">Sono un React Developer con un solido background, con discrete abilità in Three.js. Con il mio impegno e la mia creatività, cerco di trasformare le idee in realtà. La mia missione è esplorare l'universo del codice, ricercare l'eccellenza e creare esperienze digitali straordinarie.  Lavoro per migliorare ogni giorno, affrontando nuove sfide con entusiasmo. Credo fermamente che l'unico limite sia il cielo quando si tratta di sviluppo web.</p>
      </div>
      <ReactLogoCanvas />
      <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary absolute p-2 bottom-3 lg:hidden'>
            <motion.div
              animate={{
                y: [0, 23, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-white mb-.5 '
            />
          </div>
    </section>
  );

};

export default Hero;
