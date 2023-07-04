import WorldCanvas from "./canvas/World";
import IconSend from "../assets/send.png";
const Contacts = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col justify-center">
        <div className="flex justify-center">
          <h1 className="text-4xl font-black text-white">
            Contact<span className="text-[#B205BB]">s</span>
          </h1>
        </div>
        <div className="h-80 w-full">
          <WorldCanvas />
        </div>
        <div className="flex flex-col justify-center gap-3 p-10">
          <div className="flex flex-col justify-center gap-2">
            <label className="font-black text-white">
              Inserisci il tuo nome
            </label>
            <input
              type="text"
              className="rounded-md bg-[#000180] p-4 text-white outline-none focus:border-2 focus:border-[#B205BB]"
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <label className="font-black text-white">
              Inserisci il tuo messaggio
            </label>
            <textarea
              type="text"
              className="resize-none rounded-md bg-[#000180] p-4 text-white outline-none focus:border-2 focus:border-[#B205BB]"
              rows="6"
              cols="50"
            />
          </div>
          <div className=" mr-auto items-center flex cursor-pointer gap-2 rounded-md bg-[#B205BB] p-3 hover:bg-[#81028a] active:bg-[#67026e]">
            <img src={IconSend} className="h-4 w-4 " />
            <button className="font-bold text-white">
              Invia il messaggio!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
