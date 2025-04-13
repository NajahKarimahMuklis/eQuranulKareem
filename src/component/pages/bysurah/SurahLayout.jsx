import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import verseMarker from "../../../assets/versemarker.png";

function SurahLayout() {
  const [surahs, setSurahs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSurah, setCurrentSurah] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("https://api.quran.com/api/v4/chapters?language=id")
      .then((res) => res.json())
      .then((data) => setSurahs(data.chapters));
  }, []);

  useEffect(() => {
    if (id && surahs.length > 0) {
      const found = surahs.find((s) => s.id.toString() === id.toString());
      setCurrentSurah(found);
    }
  }, [id, surahs]);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name_simple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name_arabic.includes(searchTerm)
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
    <div
      id="bysurah"
      className=" h-screen overflow-hidden flex flex-col lg:flex-row"
    >
      {/* Sidebar */}
      <div
        className={`bg-gray-200 border-r p-4 pt-35 lg:pt-4 space-y-2 z-10 top-0 bottom-0 left-0 transition-transform
w-full lg:w-1/4 fixed lg:static lg:block ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className=" text-black text-3xl cormorant-garamond-regular mt-3 pl-2 pr-4 p-2 rounded-md font-bold">Daftar Surah</h1>
          <button
            className="lg:hidden text-gray-500 text-xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>


        <input
          type="text"
          placeholder="Cari surah..."
          className="w-full p-3  bg-gray-600 shadow-md  rounded-lg  text-white "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="space-y-2 overflow-y-auto max-h-[75vh]">
          {filteredSurahs.map((surah) => (
            <li
              key={surah.id}
              onClick={() => {
                navigate(`/readquran/bysurah/${surah.id}`);
                setMenuOpen(false);
              }}
              className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                surah.id.toString() === id ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <div className="  p-3 shadow-xl rounded-lg flex items-center justify-between text-md">
                {/* Kiri: versemarker + nama Latin */}
                <div className="flex items-center gap-3">
                  <span className="relative w-16 h-16 inline-block">
                    <img
                      src={verseMarker}
                      alt="Verse Marker"
                      className="w-full h-full"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-arabic text-base text-black">
                      {toArabicNumber(surah.id)}
                    </span>
                  </span>
                  <span className="truncate max-w-[150px] cormorant-garamond-regular">
                    {surah.name_simple}
                  </span>
                </div>

                {/* Kanan: Nama Arab */}
                <span className="font-arabic text-md">{surah.name_arabic}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full lg:w-3/4 p-4  overflow-y-auto lg:h-screen relative">
        {/* Tombol menu mobile */}
        <button
          className="lg:hidden fixed top-7 left-6 text-gray-100 p-2 z-30 shadow"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <Outlet />
      </div>
    </div>
  );
}

export default SurahLayout;
