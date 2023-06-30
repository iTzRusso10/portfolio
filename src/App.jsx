import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Contacts from "./components/Contacts.jsx";
const App = () => {
  return (
    <>
      <div className="relative z-1 bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <div className="relative z-0 bg-[#000127]">
        <Work />
      </div>
      <div className="relative z-0 bg-[#000127]">
        <Contacts />
      </div>
      
    </>
  );
};

export default App;
