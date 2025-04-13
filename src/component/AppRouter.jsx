import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ReadQuran from "./pages/ReadQuran";
import BySurah from "./pages/bysurah/BySurah";
import DetailSurah from "./pages/bysurah/DetailSurah";
import SurahLayout from "./pages/bysurah/SurahLayout";
import ByJuz from "./pages/byjuz/ByJuz";
import JuzLayout from "./pages/byjuz/JuzLayout";
import DetailJuz from "./pages/byjuz/DetailJuz";
import ByPage from "./pages/bypage/ByPage";
import PageLayout from "./pages/bypage/PageLayout";
import DetailPage from "./pages/bypage/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/readquran",
    element: <ReadQuran />,
  },
  {
    path: "/readquran/bysurah",
    element: <BySurah />,
  },
  {
    path: "/readquran/bysurah/:id",
    element: <SurahLayout />, 
    children: [
      {
        index: true,
        element: <DetailSurah />, 
      },
    ],
  },
  {
    path: "/readquran/byjuz",
    element: <ByJuz />,
  },
  {
    path: "/readquran/byjuz/:juzNumber",
    element: <JuzLayout />, 
    children: [
      {
        index: true, 
        element: <DetailJuz />, 
      },
    ],
  },

  {
    path: "/readquran/bypage",
    element: <ByPage />,
  },
  {
    path: "/readquran/bypage/:pageNumber",
    element: <PageLayout />, 
    children: [
      {
        index: true, 
        element: <DetailPage />, 
      },
    ],
  },


]);


export default router;
