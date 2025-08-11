import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { FaHome, FaGraduationCap, FaUserAstronaut, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaLaptopCode } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const navItems = [
    { to: "/", text: "Home", icon: <FaHome className="nav-icon" /> },
    { to: "/courses", text: "Courses", icon: <FaGraduationCap className="nav-icon" /> },
    ...(userId ? [{ to: "/create-campaign", text: "My Profile", icon: <FaUserAstronaut className="nav-icon" /> }] : [])
  ];

  const authItems = userId 
    ? [{ text: "Logout", onClick: handleLogout, icon: <FaSignOutAlt className="nav-icon" /> }]
    : [
        { to: "/login", text: "Login", icon: <FaSignInAlt className="nav-icon" /> },
        { to: "/register", text: "Register", icon: <FaUserPlus className="nav-icon" /> }
      ];

  return (
    <nav className="navbar-kids mb-5">
      <div className="navbar-container">
        <div className="navbar-brand">
          <FaLaptopCode className="logo-icon" />
          <NavLink to="/" className="navbar-logo">
            Code4Kids
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button 
          className={`menu-button ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <NavLink 
                  to={item.to} 
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Authentication Buttons */}
          <div className="auth-buttons">
            {authItems.map((item, index) => (
              item.to ? (
                <NavLink
                  key={index}
                  to={item.to}
                  className={`auth-button ${item.text.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              ) : (
                <button
                  key={index}
                  className="auth-button logout"
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

export default Navbar;
