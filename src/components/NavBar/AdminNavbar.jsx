import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { 
  FaHome, FaUserAstronaut, FaSignInAlt, FaSignOutAlt, FaLaptopCode, FaUsersCog, FaUserGraduate 
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    { to: "/admin", text: "Home", icon: <FaHome className="admin-nav-icon" /> },
    { to: "/admin/dashboard", text: "Dashboard", icon: <FaUserGraduate className="admin-nav-icon" /> },
    { to: "/admin/statistics", text: "Statistics", icon: <FaUsersCog className="admin-nav-icon" /> },
    ...(userId ? [{ to: "/admin/profile", text: "Profile", icon: <FaUserAstronaut className="admin-nav-icon" /> }] : [])
  ];

  const authItems = userId 
    ? [{ text: "Logout", onClick: handleLogout, icon: <FaSignOutAlt className="admin-nav-icon" /> }]
    : [
        { to: "/admin/login", text: "Login" , icon: <FaSignInAlt className="admin-nav-icon admin-loginBtn" /> },
      ];

  return (
    <nav className="admin-navbar mb-5">
      <div className="admin-navbar-container">
        <div className="admin-navbar-brand">
          <FaLaptopCode className="admin-logo-icon" />
          <NavLink to="/admin" className="admin-navbar-logo">
            Code4Kids
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button 
          className={`admin-menu-button ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>

        {/* Navigation Links */}
        <div className={`admin-nav-links ${menuOpen ? 'show' : ''}`}>
          <ul className="admin-nav-menu">
            {navItems.map((item, index) => (
              <li key={index} className="admin-nav-item">
                <NavLink 
                  to={item.to} 
                  className="admin-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Authentication Buttons */}
          <div className="admin-auth-buttons">
            {authItems.map((item, index) => (
              item.to ? (
                <NavLink
                  key={index}
                  to={item.to}
                  className={`admin-auth-button ${item.text.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              ) : (
                <button
                  key={index}
                  className="admin-auth-button admin-logout"
                  onClick={() => {
                    item.onClick();
                    setMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
