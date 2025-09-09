import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import AdminNavbar from "../../components/NavBar/AdminNavbar";
import "./Layout.css";

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />

      <div className="admin-content">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
