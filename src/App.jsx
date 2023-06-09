import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

const App = () => {
  return (
    <div className="relative z-0 bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
