import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"; // Import Link dan useNavigate
import logo from "../assets/logo.png";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "By Surah", to: "/readquran/bysurah" },
    { name: "By Juz", to: "/readquran/byjuz" },
    { name: "By Page", to: "/readquran/bypage" },
  ];

  return (
    <nav
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-between gap-4 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-md py-2 px-6 rounded-full w-[90%] md:w-[70%] min-h-12"
          : "py-4 px-10 w-full min-h-16"
      } transition-all duration-300 z-50`}
    >
      <img
        src={logo}
        className={`transition-all duration-300 ${
          isScrolled ? "w-10 h-10" : "w-16 h-16"
        }`}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex cormorant-garamond-regular text-xl text-white justify-center gap-6">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 rounded-[20vw] hover:bg-white hover:text-gray-800 transition-all duration-300 cursor-pointer"
          >
            <Link to={item.to}>{item.name}</Link>{" "}
            {/* Ganti button dengan Link */}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <HiX size={30} className="text-white" />
          ) : (
            <HiMenu size={30} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-3/4 bg-black/80 backdrop-blur-md flex flex-col items-end space-y-4 py-4 pr-6 md:hidden">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="text-white cursor-pointer transition-all duration-300 list-none"
            >
              <Link to={item.to}>{item.name}</Link>{" "}
              {/* Ganti button dengan Link */}
            </li>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
