import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

function BySurah() {
  const [surahs, setSurahs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.quran.com/api/v4/chapters?language=id")
      .then((res) => res.json())
      .then((data) => setSurahs(data.chapters));
  }, []);

  return (
    <>
      <Layout />
      <div className="w-full max-w-7xl mx-auto p-3 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {surahs.map((surah) => (
            <div
              key={surah.id}
              onClick={() => navigate(`/readquran/bysurah/${surah.id}`)}
              className="cursor-pointer border rounded-xl p-4 shadow hover:shadow-lg transition bg-white hover:bg-gray-700 hover:text-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3 cormorant-garamond-regular text-xl">
                  <div className=" rounded-xl w-10 h-10 flex items-center justify-center font-semibold ">
                    {surah.id} .
                  </div>
                  <div>
                    <h2 className=" font-semibold ">
                      {surah.name_simple}
                    </h2>
                    <p className=" text-sm text-gray-500">
                      {surah.translated_name.name}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-xl font-arabic">{surah.name_arabic}</p>
                  <p className="text-xs text-gray-400">
                    {surah.verses_count} ayat
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BySurah;
