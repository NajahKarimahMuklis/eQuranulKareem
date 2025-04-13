import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LANGUAGES = {
  id: { name: "Indonesian", id: 33 },
  en: { name: "English", id: 131 },
  ja: { name: "Japanese", id: 218 },
  tr: { name: "Turkish", id: 90 },
  ms: { name: "Malay", id: 134 },
};

function DetailJuz() {
  const { juzNumber } = useParams();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(36);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "id"
  );
  const navigate = useNavigate();


  useEffect(() => {
    if (juzNumber) {
      setLoading(true);

      Promise.all([
        fetch(
          `https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=${juzNumber}`
        ).then((res) => res.json()),
        fetch(
          `https://api.quran.com/api/v4/quran/translations/${LANGUAGES[selectedLang].id}?juz_number=${juzNumber}`
        ).then((res) => res.json()),
      ])
        .then(([verseData, translationData]) => {
          const combined = verseData.verses.map((verse, index) => ({
            ...verse,
            translation: translationData.translations[index]?.text || "",
          }));

          setVerses(combined);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching juz:", err);
          setLoading(false);
        });
    }
  }, [juzNumber, selectedLang]);

  useEffect(() => {
    if (verses.length) {
      const lastVerseKey = verses[verses.length - 1]?.verse_key;
      localStorage.setItem(
        "lastRead",
        JSON.stringify({
          type: "byjuz",
          id: juzNumber,
          verse: lastVerseKey,
          timestamp: Date.now(),
        })
      );
    }
  }, [verses, juzNumber]);

  const zoomIn = () => setFontSize((prev) => Math.min(prev + 4, 60));
  const zoomOut = () => setFontSize((prev) => Math.max(prev - 4, 16));

  return (
    <div className="h-full flex flex-col text-white">
      <div className="sticky top-0 z-20 bg-gradient-to-r from-gray-800 to-gray-950 p-5 border-b rounded-md shadow-md text-center">
        <h2 className="cormorant-garamond-regular tracking-wide text-3xl">
          JUZ {juzNumber}
        </h2>
        <p className="mt- cormorant-garamond-regular">{verses.length} Ayat</p>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 pb-7 justify-start mt-4 px-4">
        <button
          onClick={zoomOut}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          -
        </button>
        <button
          onClick={zoomIn}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => navigate("/readquran/byjuz")}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          Back
        </button>
      </div>

      {/* Language Selector */}
      <div className="px-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Pilih Bahasa Terjemahan
        </label>
        <select
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value);
            localStorage.setItem("selectedLang", e.target.value);
          }}
          className="bg-gray-100 text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {Object.entries(LANGUAGES).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>

      {/* Ayat & Translation */}
      <div className="text-gray-900 overflow-y-auto flex-1 px-4 py-6 space-y-6">
        {loading && <p>Memuat ayat-ayat...</p>}
        {!loading &&
          verses.map((verse) => (
            <div key={verse.id} className="border-b border-stone-300 pb-6">
              <p
                className="amiri-regular text-right leading-loose font-arabic"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: verse.text_uthmani }}
              ></p>

              <p className="cormorant-garamond-regular text-xl text-gray-800 mt-4 leading-relaxed">
                <span className="text-gray-400 font-semibold">
                  {verse.verse_key.split(":")[1]}.
                </span>{" "}
                {verse.translation
                  .replace(/<sup[^>]*>.*?<\/sup>/g, "")
                  .replace(/<[^>]*>/g, "")}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetailJuz;
