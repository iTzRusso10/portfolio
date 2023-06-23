import { navLink } from "../constants";
import { useState } from "react";
import cross from '../assets/cross.svg';
import menu from '../assets/menu.svg';

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [toggle, setToggle] = useState(true);
  return (
    <nav className="w-full z-[100] flex items-center fixed bg-[#000127] p-7 max-[330px]:p-4">
      <div className="w-full justify-between flex max-w-7xl mx-auto">
        <p className="flex font-bold cursor-pointer text-white">
          Giuseppe&nbsp;
          <span className="max-[327px]:hidden">| Front-End Developer</span>
        </p>
        <ul className="list-none flex text-white items-center gap-5">
          {navLink.map((el) => (
            <li
              key={el.id}
              className={`${active === el.title ? "text-white" : "text-gray-400"
                } cursor-pointer max-[640px]:hidden `}
              onClick={() => setActive(el.title)}
            >
              <a>{el.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigazione Mobile */}
      
      <div className="sm:hidden flex justify-end items-center z-[300]">
        <img src={!toggle ? cross : menu} alt="menu"
          className='w-[40px] h-[30px] object-contain cursor-pointer'
          onClick={() => setToggle(!toggle)} />
        <div className={`${!toggle ? 'flex' : 'hidden'} flex-col p-6 gap-3  bg-hero-pattern absolute top-[3.5rem] right-5 mx-4 my-2 min-w-[140px] z-10 rounded-xl mt-3`} >
          {navLink.map((el) => (
            <li
              key={el.id}
              className={`${active === el.title ? "text-white" : "text-gray-400"
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
