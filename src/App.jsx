import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import route from "./routes/RouteList";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
