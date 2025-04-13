import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TRANSLATIONS = [
  { id: 33, name: "Indonesian" },
  { id: 131, name: "English" },
  { id: 218, name: "Japanese" },
  { id: 90, name: "Turkish" },
  { id: 134, name: "Malay" },
];

function DetailPage() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [audioUrl, setAudioUrl] = useState({});
  const [audioPlaying, setAudioPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(36);
  const [selectedTranslationId, setSelectedTranslationId] = useState(33);

  useEffect(() => {
    fetch("https://api.quran.com/api/v4/resources/recitations")
      .then((res) => res.json())
      .then((data) =>
        setReciters(
          data.recitations.filter((r) =>
            [2, 3, 4, 5, 6, 7, 9, 10, 11].includes(r.id)
          )
        )
      );
  }, []);

  useEffect(() => {
    if (!pageNumber) return;
    setLoading(true);
    Promise.all([
      fetch(
        `https://api.quran.com/api/v4/verses/by_page/${pageNumber}?language=id&translations=${selectedTranslationId}&words=false`
      ).then((res) => res.json()),
      fetch(
        `https://api.quran.com/api/v4/verses/by_page/${pageNumber}?fields=text_uthmani`
      ).then((res) => res.json()),
    ])
      .then(([transRes, arabicRes]) => {
        const formatted = arabicRes.verses.map((v, i) => ({
          id: v.id,
          verse_key: v.verse_key,
          text_uthmani: v.text_uthmani,
          translation: transRes.verses?.[i]?.translations?.[0]?.text || "",
        }));
        setVerses(formatted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pageNumber, selectedTranslationId]);

  useEffect(() => {
    if (!selectedReciter || !verses.length) return;
    fetch(
      `https://api.quran.com/api/v4/recitations/${selectedReciter}/by_page/${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        const audioMap = {};
        data.audio_files.forEach((file) => {
          audioMap[file.verse_key] = `https://verses.quran.com/${file.url}`;
        });
        setAudioUrl(audioMap);
      })
      .catch(console.error);
  }, [selectedReciter, verses, pageNumber]);

  const handlePlayAudio = (key) => {
    if (audioPlaying) new Audio(audioUrl[audioPlaying]).pause();
    const audio = new Audio(audioUrl[key]);
    audio.play();
    setAudioPlaying(key);
  };

  return (
    <div className="h-full flex flex-col text-white">
      <div className="sticky top-0 z-20 bg-gradient-to-r from-gray-800 to-gray-950 p-5 border-b rounded-md shadow-md text-center">
        <h2 className="tracking-wide text-3xl cormorant-garamond-regular">
          HALAMAN {pageNumber}
        </h2>
      </div>

      <div className="flex gap-3 pb-4 mt-4 px-4">
        <button
          onClick={() => setFontSize((f) => Math.max(f - 4, 16))}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          -
        </button>
        <button
          onClick={() => setFontSize((f) => Math.min(f + 4, 60))}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => navigate("/readquran/bypage")}
          className="bg-gray-600 cormorant-garamond-regular hover:bg-gray-500 text-white px-4 py-1 rounded"
        >
          Back
        </button>
      </div>

      <div className="mb-4 cormorant-garamond-regular px-4 space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Pilih Qari
          </label>
          <select
            className="bg-gray-100 mt-1 w-full p-2 border border-gray-300 text-gray-500 rounded-md"
            value={selectedReciter || ""}
            onChange={(e) => {
              setSelectedReciter(e.target.value);
              setAudioUrl({});
            }}
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

        <div>
          <label className="cormorant-garamond-regular block text-sm font-medium text-gray-300">
            Pilih Terjemahan
          </label>
          <select
            className="bg-gray-100 mt-1 w-full p-2 border border-gray-300 text-gray-500 rounded-md"
            value={selectedTranslationId}
            onChange={(e) => setSelectedTranslationId(e.target.value)}
          >
            {TRANSLATIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-gray-900 overflow-y-auto flex-1 px-4 py-6 space-y-6">
        {loading ? (
          <p>Memuat ayat-ayat...</p>
        ) : (
          verses.map((verse) => (
            <div key={verse.id} className="border-b border-stone-300 pb-6">
              <p
                className="amiri-regular text-right leading-loose font-arabic"
                style={{ fontSize }}
                dangerouslySetInnerHTML={{ __html: verse.text_uthmani }}
              ></p>
              <p className="cormorant-garamond-regular text-xl text-gray-800 mt-4 leading-relaxed">
                <span className="text-gray-400 font-semibold">
                  {verse.verse_key.split(":")[1]}.
                </span>{" "}
                {verse.translation
                  .replace(/<sup[^>]*>.*?<\/sup>/g, "")
                  .replace(/<[^>]*>/g, "")
                  .replace(/[٠-٩]+$/, "")}
              </p>
              {selectedReciter && audioUrl[verse.verse_key] && (
                <div className="mt-2 flex gap-2 items-center">
                  <button
                    onClick={() => handlePlayAudio(verse.verse_key)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                  >
                    Play Audio
                  </button>
                  {audioPlaying === verse.verse_key && (
                    <span className="text-green-500">Playing...</span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DetailPage;
