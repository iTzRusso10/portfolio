import ReactLogoCanvas from "./canvas/ReactLogo";

const Hero = () => {
  return (
    <section className="w-full flex md:flex-row flex-col justify-around h-screen">
        <div className="flex flex-col justify-center items-center w-full mt-32 md:mt-0 ">
          <div className="flex flex-col items-center justify-center gap-3 p-5">
            <h1 className="font-black text-4xl md:text-6xl text-[#ffffff] text-center">Giuseppe Russo</h1>
            <p className="text-white text-base md:text-lg text-center px-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam non nisi temporibus exercitationem officia sit consectetur obcaecati fugit eius corrupti hic optio maxime, quisquam veniam ea maiores necessitatibus beatae aliquid! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet nam amet commodi consectetur eius quas et quia deserunt earum exercitationem error cupiditate iure inventore repellendus numquam, odit soluta omnis vel.</p>
          </div>
        </div>
        <ReactLogoCanvas />
    </section>
  );
};

export default Hero;
