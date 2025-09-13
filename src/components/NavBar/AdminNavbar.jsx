import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  FaHome,
  FaUserAstronaut,
  FaSignInAlt,
  FaSignOutAlt,
  FaLaptopCode,
  FaUsersCog,
  FaUserGraduate,
} from "react-icons/fa";
import "./AdminNavbar.css";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin", text: "Dashboard", icon: <FaHome /> },
    // { to: "/admin/courses", text: "Courses", icon: <FaUsersCog /> },
    { to: "/admin/categories", text: "Categories", icon: <FaUsersCog /> },
    ...(userId
      ? [{ to: "/admin/profile", text: "Profile", icon: <FaUserAstronaut /> }]
      : []),
  ];

  const authItems = userId
    ? [{ text: "Logout", onClick: handleLogout, icon: <FaSignOutAlt /> }]
    : [{ to: "/admin/login", text: "Login", icon: <FaSignInAlt /> }];

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <FaLaptopCode className="sidebar-logo" />
        {!collapsed && <h2 className="sidebar-title">Code4Kids</h2>}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} className="sidebar-link">
                {item.icon}
                {!collapsed && <span>{item.text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-3">
          <div className="dropdown w-100">
            <button
              className="btn btn-outline-primary w-100 dropdown-toggle"
              type="button"
              id="actionsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ color: "#64CA80", backgroundColor: "#265D73" }}
            >
              + New
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="actionsDropdown"
              style={{ width: "100%" }}
            >
              <li>
                <NavLink
                  to="/admin/categories/add-new"
                  className="dropdown-item"
                >
                  Add Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/courses/add-new" className="dropdown-item">
                  Add Course
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/lessons/add-new" className="dropdown-item">
                  Add Lesson
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Footer (Auth buttons) */}
      <div className="sidebar-footer">
        {authItems.map((item, index) =>
          item.to ? (
            <NavLink key={index} to={item.to} className="sidebar-link">
              {item.icon}
              {!collapsed && <span>{item.text}</span>}
            </NavLink>
          ) : (
            <button key={index} onClick={item.onClick} className="sidebar-link">
              {item.icon}
              {!collapsed && <span>{item.text}</span>}
            </button>
          )
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
