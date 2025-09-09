import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import Register from "../pages/Register/Register";
import { Layout } from "../pages/Layout/Layout";
import Courses from "../pages/Courses/Courses";
import Profile from "../pages/Profile/Profile";
import CourseDetails from "../pages/Courses/CourseDetails";
import LessonsList from "../pages/Lessons/LessonsList";
import LessonsApp from "../pages/Lessons/LessonsApp";
import ParentDashboard from "../pages/Dashboard/ParentDashboard";
import KidDashboard from "../pages/Dashboard/KidDashboard";
import Games from "../pages/Games/Games";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { AdminLayout } from "../pages/Layout/AdminLayout";
import AdminHome from "../pages/Home/AdminHome";
import AdminStatistics from "../pages/AdminStatistics/AdminStatistics";
import EditCourse from "../pages/AdminDashboard/EditCourse";
import EditLesson from "../pages/AdminDashboard/EditLesson";
import AddCourse from "../pages/AdminDashboard/AddCourse";
import AddLesson from "../pages/AdminDashboard/AddLesson";
import HelpCenter from '../pages/HelpCenter/HelpCenter';
import FAQ from '../pages/FAQ/FAQ';
import ContactUs from '../pages/ContactUs/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService/TermsOfService';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import AboutUs from '../pages/AboutUs/AboutUs';
import OurTeam from '../pages/OurTeam/OurTeam';
import { AdminCategories } from "../pages/AdminCategories/AdminCategories";
import { AdminProfile } from "../pages/AdminProfile/AdminProfile";

// const role = localStorage.getItem("role");

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
        path: "games",
        element: <Games />,
      },
      {
        path: "course-details/:id",
        element: <CourseDetails />,
      },
      {
        path: "courses/:id/lessons",
        element: <LessonsList />,
      },
      {
        path: "courses/:courseId/lessons/:lessonId",
        element: <LessonsApp />,
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
      { path: "help-center", element: <HelpCenter /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "cookie-policy", element: <CookiePolicy /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "our-team", element: <OurTeam /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },

  //admin
  { path: "admin/login", element: <AdminLogin /> },
  { path: "/admin/courses/:id/edit", element: <EditCourse /> },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminStatistics />,
      },
      { path: "users", element: <AdminStatistics /> },
      { path: "courses", element: <AdminDashboard /> },
      { path: "courses/:id/edit", element: <EditCourse /> },
      { path: "lessons/:id/edit", element: <EditLesson /> },
      { path: "courses/add-new", element: <AddCourse /> },
      { path: "lessons/add-new", element: <AddLesson /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "profile", element: <AdminProfile /> },


    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

export default route;
