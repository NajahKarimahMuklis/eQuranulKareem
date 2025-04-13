import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

function ByJuz() {
  const [juzs, setJuzs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.quran.com/api/v4/juzs")
      .then((res) => res.json())
      .then((data) => {
        // Filter duplikat berdasarkan juz_number
        const uniqueJuzs = [];
        const seenJuzNumbers = new Set();

        data.juzs.forEach((juz) => {
          if (!seenJuzNumbers.has(juz.juz_number)) {
            seenJuzNumbers.add(juz.juz_number);
            uniqueJuzs.push(juz);
          }
        });

        setJuzs(uniqueJuzs);
      })
      .catch((err) => console.error("Error fetching Juzs:", err));
  }, []);

  const handleJuzClick = (juzNumber) => {
    navigate(`/readquran/byjuz/${juzNumber}`);
  };

  return (
    <>
      <Layout />
      <div className="p-4 w-screen max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {juzs.map((juz) => (
            <div
              key={juz.id}
              className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-md transition text-center hover:bg-gray-700 hover:text-white"
              onClick={() => handleJuzClick(juz.juz_number)}
            >
              <p className="cormorant-garamond-regular text-lg font-semibold">Juz {juz.juz_number}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ByJuz;
