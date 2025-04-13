import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

function ByPage() {
  const navigate = useNavigate();
  const pages = Array.from({ length: 604 }, (_, i) => i + 1);

  const handleClick = (pageNumber) => {
    navigate(`/readquran/bypage/${pageNumber}`);
  };

  return (
    <>
      <Layout />
      <div className="p-4 w-screen max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {pages.map((page) => (
            <div
              key={page}
              onClick={() => handleClick(page)}
              className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-md transition text-center hover:bg-gray-700 hover:text-white"
            >
              <p className="text-lg cormorant-garamond-regular font-semibold">Page {page}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ByPage;
