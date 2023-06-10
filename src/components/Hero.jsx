import ReactLogoCanvas from "./canvas/ReactLogo";

const Hero = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center p-6 gap-4 mt-28">
        <h1 className="text-white font-black text-4xl">Giuseppe <span className="text-[#B205BB]">Russo</span></h1>
        <p className="text-white text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque in maxime ipsa rerum error dicta, expedita quidem. Repudiandae ea aliquid nemo deleniti fugiat obcaecati quia laudantium ad temporibus voluptas?</p>
      </div>
      <ReactLogoCanvas />
    </section>
  );

};

export default Hero;
