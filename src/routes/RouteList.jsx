import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Login  from "../pages/Login/Login";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import Register from "../pages/Register/Register";
import { Layout } from "../pages/Layout/Layout";
import { Courses } from "../pages/Courses/Courses";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
        
            <Home />
          
        ),
      },
      {
        path: "courses",
        element: (
         
            <Courses />
          
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default route;
