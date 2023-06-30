import WorldCanvas from "./canvas/World";

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
      </div>
    </>
  );
};

export default Contacts;
