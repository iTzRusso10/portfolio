import { navLink } from "../constants";
import { useState, useEffect } from "react";
import cross from "../assets/cross.svg";
import menu from "../assets/menu.svg";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        scrolled ? "bg-[#000127]" : "bg-transparent"
      } fixed z-[300] flex w-full items-center bg-[#000127] p-7 max-[330px]:p-4`}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between">
        <p className="flex cursor-pointer font-bold text-white">
          Giuseppe&nbsp;
          <span className="max-[327px]:hidden">| Front-End Developer</span>
        </p>
        <ul className="flex list-none items-center gap-5 text-white">
          {navLink.map((el) => (
            <li
              key={el.id}
              className={`${
                active === el.title ? "text-white" : "text-gray-400"
              } cursor-pointer max-[640px]:hidden `}
              onClick={() => setActive(el.title)}
            >
              <a>{el.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigazione Mobile */}

      <div className="z-[300] flex items-center justify-end sm:hidden">
        <img
          src={!toggle ? cross : menu}
          alt="menu"
          className="h-[30px] w-[40px] cursor-pointer object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "flex" : "hidden"
          } absolute right-5 top-[3.5rem]  z-10 mx-4 my-2 mt-3 min-w-[140px] flex-col gap-3 rounded-xl bg-hero-pattern p-6`}
        >
          {navLink.map((el) => (
            <li
              key={el.id}
              className={`${
                active === el.title ? "text-white" : "text-gray-400"
              } cursor-pointer list-none`}
              onClick={() => {
                setActive(el.title);
                setToggle(!toggle);
              }}
            >
              <a>{el.title}</a>
            </li>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
