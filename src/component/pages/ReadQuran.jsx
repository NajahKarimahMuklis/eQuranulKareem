import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ⬅️ import motion
import quran from "../../assets/quran.jpg";
import bookmark from "../../assets/bookmark.jpg";

function ReadQuran() {
  const navigate = useNavigate();
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lastRead"));
    setLastRead(stored);
  }, []);

  const handleContinueReading = () => {
    if (lastRead) {
      const { type, id } = lastRead;
      navigate(`/readquran/${type}/${id}`);
    } else {
      navigate("/readquran/bysurah");
    }
  };

  return (
    <div
      id="readquran"
      className="min-h-[70vh] w-full bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-6 sm:py-23 md:py-23"
    >
      <h1 className="reem-kufi text-3xl sm:text-5xl md:text-5xl font-bold mb-10 text-center">
        القرآن الكريم
      </h1>

      <div className="grid grid-cols-1 cormorant-garamond-regular md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Article 1 */}
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className="rounded-lg overflow-hidden bg-neutral-200 shadow-sm"
        >
          <img alt="Surah" src={quran} className="h-66 w-full object-cover" />

          <div
            className="p-6 flex flex-col items-center gap-4 cursor-pointer transition rounded-lg"
            onClick={() => navigate("/readquran/bysurah")}
          >
            <div className="flex flex-row items-center gap-3 border border-gray-300 shadow-xl rounded-md px-6 py-3">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-3xl text-gray-950"
              />
              <span className="text-xl sm:text-2xl font-semibold text-black">
                Read Surah
              </span>
            </div>

            <p className="text-center text-gray-600 text-sm sm:text-base max-w-xs">
              Start reading Qur'an by surah, juz, or even page now!
            </p>
          </div>
        </motion.article>

        {/* Article 2 */}
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          className="rounded-lg overflow-hidden bg-neutral-200 shadow-sm"
        >
          <img
            alt="Bookmark"
            src={bookmark}
            className="h-66 w-full object-cover"
          />

          <div
            className="p-6 flex flex-col items-center gap-4 cursor-pointer"
            onClick={handleContinueReading}
          >
            <div className="flex flex-row items-center gap-3 border border-gray-300 shadow-xl rounded-md px-6 py-3">
              <FontAwesomeIcon
                icon={faBookBookmark}
                className="text-3xl text-gray-950"
              />
              <span className="text-xl sm:text-2xl font-semibold text-black">
                Continue
              </span>
            </div>

            {lastRead?.verse && (
              <p className="text-sm text-gray-500">
                Last read: <span className="font-medium">{lastRead.verse}</span>
              </p>
            )}

            <h3 className="text-lg text-center text-gray-600">
              Resume your last read surah, juz, or page instantly!
            </h3>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default ReadQuran;
