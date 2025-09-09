import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import route from "./routes/RouteList";
import { LanguageProvider } from "./components/NavBar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <LanguageProvider>
        <RouterProvider router={route}></RouterProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;