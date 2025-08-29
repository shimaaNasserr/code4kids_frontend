import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useRef, createContext, useContext } from "react";
import { FaHome, FaRocket, FaGamepad, FaTrophy, FaUserAstronaut, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaRobot, FaVolumeUp, FaVolumeMute, FaGlobe } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

// Language Context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const translations = {
    en: {
      home: 'Home',
      startLearning: 'Start Learning',
      games: 'Games & Fun',
      askRobot: 'Ask Robot',
      myProgress: 'My Progress',
      profile: 'Profile',
      parentDashboard: 'Parent Dashboard',
      kidDashboard: 'Kid Dashboard',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      chatHelper: 'Need Help? Ask me!'
    },
    ar: {
      home: 'الرئيسية',
      startLearning: 'ابدأ التعلم',
      games: 'الألعاب والمرح',
      askRobot: 'اسأل الروبوت',
      myProgress: 'تقدمي',
      profile: 'الملف الشخصي',
      parentDashboard: 'لوحة الوالدين',
      kidDashboard: 'لوحة الطفل',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      chatHelper: 'تحتاج مساعدة؟ اسألني!'
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };
  
  const playSound = (soundType) => {
    if (!soundEnabled) return;
    // Simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const sounds = {
      click: { frequency: 800, duration: 0.1 },
      hover: { frequency: 600, duration: 0.05 },
      success: { frequency: 1000, duration: 0.2 }
    };
    
    const sound = sounds[soundType] || sounds.click;
    oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
  };
  
  return (
    <LanguageContext.Provider value={{ 
      language, 
      translations: translations[language], 
      toggleLanguage, 
      soundEnabled, 
      setSoundEnabled, 
      playSound,
      isRTL: language === 'ar'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { translations, toggleLanguage, language, soundEnabled, setSoundEnabled, playSound, isRTL } = useLanguage();

  const handleLogout = () => {
    playSound('click');
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleNavClick = (soundType = 'click') => {
    playSound(soundType);
    setMenuOpen(false);
  };

  const navItems = [
    { 
      to: "/", 
      text: translations.home, 
      icon: <FaHome className="nav-icon" />,
      color: "#ff6b6b",
      hoverColor: "#ff5252"
    },
    { 
      to: "/courses", 
      text: translations.startLearning, 
      icon: <FaRocket className="nav-icon" />,
      color: "#4ecdc4",
      hoverColor: "#26a69a"
    },
    { 
      to: "/games", 
      text: translations.games, 
      icon: <FaGamepad className="nav-icon" />,
      color: "#45b7d1",
      hoverColor: "#2196f3"
    },
    { 
      to: "/progress", 
      text: translations.myProgress, 
      icon: <FaTrophy className="nav-icon" />,
      color: "#ffd93d",
      hoverColor: "#ffc107"
    },
    ...(userId ? [{ 
      to: "/profile", 
      text: translations.profile, 
      icon: <FaUserAstronaut className="nav-icon" />,
      color: "#a8e6cf",
      hoverColor: "#81c784"
    }] : [])
  ];

  const authItems = userId 
    ? [{ text: translations.logout, onClick: handleLogout, icon: <FaSignOutAlt className="nav-icon" /> }]
    : [
        { to: "/login", text: translations.login, icon: <FaSignInAlt className="nav-icon loginBtn" /> },
        { to: "/register", text: translations.register, icon: <FaUserPlus className="nav-icon" /> }
      ];

  return (
    <>
      <motion.nav 
        className={`navbar-kids mb-5 ${isRTL ? 'rtl' : 'ltr'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="navbar-container">
          <motion.div 
            className="navbar-brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <FaRobot className="logo-icon" />
            </motion.div>
            <NavLink to="/" className="navbar-logo" onClick={() => handleNavClick('success')}>
              Code4Kids
            </NavLink>
          </motion.div>

          {/* Control Buttons */}
          <div className="navbar-controls">
            {/* Sound Toggle */}
            <motion.button
              className="control-button sound-toggle"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSound('click');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              className="control-button language-toggle"
              onClick={() => {
                toggleLanguage();
                playSound('click');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Switch Language"
            >
              <FaGlobe />
              <span className="lang-text">{language === 'en' ? 'عربي' : 'EN'}</span>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button 
              className={`menu-button ${menuOpen ? 'open' : ''}`} 
              onClick={() => {
                setMenuOpen(!menuOpen);
                playSound('click');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'close' : 'menu'}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Navigation Links */}
          <AnimatePresence>
            {(menuOpen || window.innerWidth > 992) && (
              <motion.div 
                className={`nav-links ${menuOpen ? 'show' : ''}`}
                initial={{ opacity: 0, x: isRTL ? -300 : 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -300 : 300 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <ul className="nav-menu">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="nav-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -3,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <NavLink 
                        to={item.to} 
                        className="nav-link"
                        style={{
                          '--item-color': item.color,
                          '--item-hover-color': item.hoverColor
                        }}
                        onClick={() => handleNavClick('hover')}
                        onMouseEnter={() => playSound('hover')}
                      >
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span>{item.text}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                {/* Authentication Buttons */}
                <motion.div 
                  className="auth-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {authItems.map((item, index) => (
                    item.to ? (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <NavLink
                          to={item.to}
                          className={`auth-button ${item.text.toLowerCase().replace(' ', '-')}`}
                          onClick={() => handleNavClick()}
                          onMouseEnter={() => playSound('hover')}
                        >
                          {item.icon}
                          <span>{item.text}</span>
                        </NavLink>
                      </motion.div>
                    ) : (
                      <motion.button
                        key={index}
                        className="auth-button logout"
                        onClick={() => {
                          item.onClick();
                          setMenuOpen(false);
                        }}
                        onMouseEnter={() => playSound('hover')}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </motion.button>
                    )
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>


      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
