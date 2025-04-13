import { RouterProvider } from "react-router-dom";
import router from "./component/AppRouter";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
