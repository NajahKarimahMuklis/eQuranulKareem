import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LANGUAGES = {
  ja: { name: "Indonesian", id: 33 },
  en: { name: "English", id: 131 },
  id: { name: "Japanese", id: 218 },
  tr: { name: "Turkish", id: 90 },
  ms: { name: "Malay", id: 134 },
};

function DetailSurah() {
  const { id } = useParams();
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "id"
  );
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [surahInfo, setSurahInfo] = useState(null);
  const [fontSize, setFontSize] = useState(36);
  const [showAyat, setShowAyat] = useState(true); // state for hiding/showing verses

  useEffect(() => {
    fetch(`https://api.quran.com/api/v4/chapters/${id}?language=id`)
      .then((res) => res.json())
      .then((data) => setSurahInfo(data.chapter));
  }, [id]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(
        `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`
      ).then((res) => res.json()),
      fetch(
        `https://api.quran.com/api/v4/quran/translations/${LANGUAGES[selectedLang].id}?chapter_number=${id}`
      ).then((res) => res.json()),
    ]).then(([verseData, translationData]) => {
      setVerses(verseData.verses);
      setTranslations(translationData.translations);
      setLoading(false);
    });
  }, [id, selectedLang]);

  useEffect(() => {
    fetch("https://api.quran.com/api/v4/resources/recitations")
      .then((res) => res.json())
      .then((data) => {
        const allowedIds = [2, 3, 4, 5, 6, 7, 9, 10, 11];
        const selected = data.recitations.filter((r) =>
          allowedIds.includes(r.id)
        );
        setReciters(selected);
      });
  }, []);

  useEffect(() => {
    if (verses.length) {
      const lastVerseKey = verses[verses.length - 1]?.verse_key;

      localStorage.setItem(
        "lastRead",
        JSON.stringify({
          type: "bysurah",
          id,
          verse: lastVerseKey,
          timestamp: Date.now(),
        })
      );
    }
  }, [verses]);

  const handleSelectReciter = (reciterId) => {
    setSelectedReciter(reciterId);
    fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAudioUrl(data.audio_file.audio_url);
      });
  };

  const zoomIn = () => setFontSize((prev) => Math.min(prev + 4, 60));
  const zoomOut = () => setFontSize((prev) => Math.max(prev - 4, 16));

  const toggleAyatVisibility = () => {
    setShowAyat((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col text-white">
      {surahInfo && (
        <div className="cormorant-garamond-regular sticky top-0 z-20 bg-gradient-to-r from-gray-800 to-gray-950 p-5 border-b rounded-md shadow-md text-center">
          <h2 className="text-3xl tracking-wide">
            {surahInfo.name_complex.toUpperCase()} -{" "}
            {surahInfo.translated_name.name.toUpperCase()}
          </h2>
          <p className="text-sm mt-1">{surahInfo.verses_count} Ayat</p>
          {surahInfo.revelation_place.toUpperCase()}
        </div>
      )}

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
          onClick={() => (window.location.href = "/readquran/bysurah")}
          className="bg-gray-600 cormorant-garamond-regular hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          Back
        </button>
        <button
          onClick={toggleAyatVisibility}
          className="bg-yellow-600 cormorant-garamond-regular hover:bg-yellow-500 text-white px-4 py-1 rounded"
        >
          {showAyat ? "Sembunyikan Ayat" : "Tampilkan Ayat"}
        </button>
      </div>

      <div className="text-gray-950 overflow-y-auto flex-1 px-4 py-6 space-y-6">
        {/* Language Selector */}
        <div className="mb-4 cormorant-garamond-regular">
          <label className="block text-sm font-medium text-gray-700">
            Pilih Bahasa Terjemahan
          </label>
          <select
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              localStorage.setItem("selectedLang", e.target.value);
            }}
            className="bg-gray-100 mt-1 block w-full p-2 border border-gray-300 text-gray-500 rounded-md"
          >
            {Object.entries(LANGUAGES).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reciter Selector */}
        <div className="mb-4 cormorant-garamond-regular">
          <label
            htmlFor="reciter"
            className="block text-sm font-medium text-gray-700"
          >
            Pilih Qari
          </label>
          <select
            id="reciter"
            className="bg-gray-100 mt-1 block w-full p-2 border border-gray-300 text-gray-500 rounded-md"
            onChange={(e) => handleSelectReciter(e.target.value)}
            value={selectedReciter || ""}
          >
            <option value="" disabled>
              Pilih Qari
            </option>
            {reciters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.reciter_name}
              </option>
            ))}
          </select>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <div className="mb-6">
            <audio controls src={audioUrl} className="w-full">
              Browser tidak mendukung audio.
            </audio>
          </div>
        )}

        {/* Ayat Display */}
        {loading && <p>Loading ayat...</p>}
        {!loading && (
          <div className="space-y-10">
            {verses.map((verse, index) => (
              <div key={verse.id} className="border-b border-stone-700 pb-6">
                {showAyat && (
                  <p
                    className="amiri-regular text-right leading-loose font-arabic"
                    style={{ fontSize: `${fontSize}px` }}
                    dangerouslySetInnerHTML={{ __html: verse.text_uthmani }}
                  ></p>
                )}
                {translations[index] && (
                  <p className="cormorant-garamond-regular text-xl text-gray-800 mt-4 leading-relaxed">
                    <span className="text-gray-400 font-semibold">
                      {verse.verse_key.split(":")[1]}.
                    </span>{" "}
                    {translations[index].text
                      .replace(/<sup[^>]*>.*?<\/sup>/g, "")
                      .replace(/<[^>]*>/g, "")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailSurah;
