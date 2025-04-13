import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("byjuz");

  useEffect(() => {
    const tabName = location.pathname.split("/")[2];
    setActiveTab(tabName);
  }, [location.pathname]);

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-950 sticky top-0 z-20 p-4 w-full">
      <div className="w-full h-full">
        <h1 className="reem-kufi text-3xl sm:text-5xl md:text-5xl font-bold mb-6 mt-5 text-center text-white">
          القرآن الكريم
        </h1>
      </div>
      <div className="flex gap-6 pl-5 text-sm font-semibold mb-6">
        <Link to="/" className="text-gray-400 hover:text-white text-2xl">
          <FaHome /> {/* Ikon Home */}
        </Link>
        <Link
          to="/readquran/bysurah"
          className={
            activeTab === "bysurah"
              ? "border-b-2 border-white pb-1 text-white"
              : "text-gray-400 hover:text-white"
          }
        >
          Surah
        </Link>
        <Link
          to="/readquran/byjuz"
          className={
            activeTab === "byjuz"
              ? "border-b-2 border-white pb-1 text-white"
              : "text-gray-400 hover:text-white"
          }
        >
          Juz
        </Link>
        <Link
          to="/readquran/bypage"
          className={
            activeTab === "bypage"
              ? "border-b-2 border-white pb-1 text-white"
              : "text-gray-400 hover:text-white"
          }
        >
          Page
        </Link>
      </div>
    </div>
  );
}

export default Layout;
