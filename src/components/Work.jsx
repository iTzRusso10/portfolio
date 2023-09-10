import resize from "../assets/resize.png";
import video from "../video/minigames-react-video.mp4";
import poster from "../img/poster-video.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Work = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2, // Cambia in base a quando vuoi che l'animazione si attivi (0.1 indica che l'animazione si attiverà quando almeno il 10% dell'elemento è visibile)
  });

  const variants = {
    hidden: { opacity: 0, y: 200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  return (
    <div ref={ref}>
      {/* Versione Mobile */}
      <motion.div
        className="z-[1] flex h-full w-full flex-col justify-center gap-5 px-6 py-12 lg:px-0 lg:py-0"
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <div className="flex flex-col justify-center gap-3 min-[769px]:hidden">
          <div className="flex flex-col items-center justify-center gap-4 ">
            <h1 className="text-4xl font-black text-[#B205BB] ">
              <span className="text-4xl text-white">My</span> Work
            </h1>
            <h3 className="font-black text-white">
              MINIGAMES WITH <span className="text-[#B205BB]">REACT</span>
            </h3>
            <video
              controls
              className="rounded-lg"
              preload="auto"
              poster={poster}
            >
              <source src={video} type="video/mp4" />
            </video>
            <p className="p-3 text-center text-white">
              <span className="font-black">Minigames with React</span> è una
              collezione di tre giochi interattivi che ho creato utilizzando
              React. Questa applicazione dimostra le mie capacità di sviluppo
              frontend, tra cui la gestione dello stato dell&apos;applicazione,
              l&apos;interazione con l&apos;utente e l&apos;uso dei componenti
              React. I giochi inclusi nel progetto sono:{" "}
              <ul className="list-disc">
                <li className="mb-2 mt-2">
                  <span className="font-black">Indovina il Numero</span>: Un
                  gioco classico in cui il computer sceglie un numero casuale e
                  l&apos;utente deve indovinare quale numero è stato scelto.
                </li>
                <li className="mb-3">
                  <span className="font-black">Box Fortunata</span>: In questo
                  gioco, l&apos;utente seleziona una delle molte scatole
                  presenti sullo schermo, ogni giro la box giusta cambia anche
                  se sbagli! Occhio!
                </li>
                <li className="mb-3">
                  <span className="font-black">Tira il Dado</span>: Un semplice
                  gioco di dadi in cui l&apos;utente &quot;tira&quot; un dado e
                  ottiene deve indovinare il numero che uscirà.
                </li>
              </ul>
              Ogni gioco è stato progettato con l&apos;obiettivo di creare
              un&apos;esperienza utente coinvolgente e divertente. Spero che ti
              divertirai a esplorarli tanto quanto mi sono divertito a
              creare!&quot;
            </p>
          </div>
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

        {/* Versione Desktop */}
        <div className="gap-15 flex h-[600px] items-center justify-center	gap-24 py-10 max-[768px]:hidden">
          <div className="flex w-[40%] flex-col gap-1">
            <h1 className="text-center text-4xl font-black text-[#B205BB]">
              <span className="text-4xl text-white">My</span> Work
            </h1>
            <p className="text-center text-sm text-white">
              <span className="font-black">Minigames with React</span> è una
              collezione di tre giochi interattivi che ho creato utilizzando
              React. Questa applicazione dimostra le mie capacità di sviluppo
              frontend, tra cui la gestione dello stato dell&apos;applicazione,
              l&apos;interazione con l&apos;utente e l&apos;uso dei componenti
              React. I giochi inclusi nel progetto sono:{" "}
              <li className="mb-1 mt-1">
                <span className="font-black">Indovina il Numero</span>: Un gioco
                classico in cui il computer sceglie un numero casuale e
                l&apos;utente deve indovinare quale numero è stato scelto.
              </li>
              <li className="mb-1">
                <span className="font-black">Box Fortunata</span>: In questo
                gioco, l&apos;utente seleziona una delle molte scatole presenti
                sullo schermo, ogni giro la box giusta cambia anche se sbagli!
                Occhio!
              </li>
              <li className="mb-1">
                <span className="font-black">Tira il Dado</span>: Un semplice
                gioco di dadi in cui l&apos;utente &quot;tira&quot; un dado e
                ottiene deve indovinare il numero che uscirà.
              </li>
              Ogni gioco è stato progettato con l&apos;obiettivo di creare
              un&apos;esperienza utente coinvolgente e divertente. Spero che ti
              divertirai a esplorarli tanto quanto mi sono divertito a
              creare!&quot;
            </p>
          </div>
          <div className="h-[370px] w-1 rounded-full bg-white"></div>
          <div className="flex w-[35%] flex-col gap-3">
            <video
              controls
              className="rounded-lg  "
              preload="auto"
              poster={poster}
            >
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
        </div>
      </motion.div>
    </div>
  );
};

export default Work;
