import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import Register from "../pages/Register/Register";
import { Layout } from "../pages/Layout/Layout";
import { Courses } from "../pages/Courses/Courses";
import { Profile } from "../pages/Profile/Profile";
import CourseDetails from "../pages/Courses/CourseDetails";
import Lessons from "../pages/Lessons/Lessons";
import ParentDashboard from "../pages/Dashboard/ParentDashboard";
import KidDashboard from "../pages/Dashboard/KidDashboard";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "course-details/:id",
        element: <CourseDetails />,
      },
      {
        path: "courses/:id/lessons",
        element: <Lessons />,
      },
      {
        path: "/parent-dashboard",
        element: <ParentDashboard />,
      },
      {
        path: "/kid-dashboard",
        element: <KidDashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default route;
