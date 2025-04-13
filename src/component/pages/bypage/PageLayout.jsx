import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import verseMarker from "../../../assets/versemarker.png";

function PageLayout() {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pageArray = Array.from({ length: 604 }, (_, i) => i + 1);

  const filteredPages = pageArray.filter((p) =>
    p.toString().includes(search.trim())
  );
  const toArabicNumber = (num) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((d) => arabicDigits[parseInt(d)])
      .join("");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div
        className={`bg-gray-200 border-r p-4 pt-28 lg:pt-4 space-y-2 z-10 top-0 bottom-0 left-0 transition-transform
        w-full lg:w-1/4 fixed lg:static lg:block ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl cormorant-garamond-regular font-bold mt-3">
            Daftar Halaman
          </h1>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Cari halaman..."
          className="w-full p-3 bg-gray-600 text-white rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul className="space-y-2 overflow-y-auto max-h-[75vh]">
          {filteredPages.map((page) => (
            <li
              key={page}
              onClick={() => {
                navigate(`/readquran/bypage/${page}`);
                setMenuOpen(false);
              }}
              className={`p-3 cursor-pointer rounded hover:bg-gray-100 ${
                pageNumber == page ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              <div className="w-full rounded-lg flex justify-between items-center text-xl">
                <div className="w-full flex items-center gap-3 shadow-xl rounded-lg">
                  <span className="relative w-16 h-16 inline-block">
                    <img
                      src={verseMarker}
                      className="w-full h-full"
                      alt="Verse Marker"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-arabic text-base text-black">
                      {toArabicNumber(page)}
                    </span>
                  </span>
                  <span className="text-base cormorant-garamond-regular text-xl">
                    Halaman {page}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Outlet */}
      <div className="w-full lg:w-3/4 p-4 overflow-y-auto lg:h-screen relative">
        <button
          className="lg:hidden text-white fixed top-7 left-6 text-gray-900 p-2 z-30"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default PageLayout;
