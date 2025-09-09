import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaRocket, FaGamepad, FaTrophy, FaRobot, FaStar, FaHeart, FaCode, FaPuzzlePiece, FaUsers, FaGift, FaSpinner, FaExclamationTriangle, FaChild, FaGraduationCap, FaGlobe, FaLock, FaPalette, FaMusic, FaCamera, FaVideo, FaMobile, FaDesktop, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import ColorMagicGame from '../../components/ColorMagicGame/ColorMagicGame';
import LearningJourney from '../../components/LearningJourney/LearningJourney';
import VisualBreak from '../../components/VisualBreak/VisualBreak';
import FloatingChatbot from '../../components/FloatingChatbot/FloatingChatbot';
import axiosInstance from "../../apis/config";
import './Home.css';
import './AdventureFeatures.css';
import './ProgressSection.css';

const EnhancedHome = () => {
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDailyTip, setShowDailyTip] = useState(false);
  const navigate = useNavigate();
  
  // Add error boundary for useLanguage hook
  let languageContext;
  try {
    languageContext = useLanguage();
  } catch (err) {
    console.error('Language context error:', err);
    // Fallback values
    languageContext = {
      language: 'en',
      translations: {},
      playSound: () => {},
      isRTL: false
    };
  }
  
  const { translations, language, playSound, isRTL } = languageContext;

  const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || (language === 'en' ? 'Young Coder' : 'المبرمج الصغير');

  // Mascot messages
  const mascotMessages = {
    en: [
      "Hi there, young coder! 🚀",
      "Ready for an amazing coding adventure? ✨",
      "Let's build something awesome together! 🎮",
      "Coding is like magic - let me show you! 🪄"
    ],
    ar: [
      "مرحباً أيها المبرمج الصغير! 🚀",
      "هل أنت مستعد لمغامرة برمجة رائعة؟ ✨", 
      "دعنا نبني شيئاً رائعاً معاً! 🎮",
      "البرمجة مثل السحر - دعني أريك! 🪄"
    ]
  };

  const [currentMascotMessage, setCurrentMascotMessage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [robotPosition, setRobotPosition] = useState('hero'); // 'hero', 'moving', 'chatbot'
  const [hasMovedToCorner, setHasMovedToCorner] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMascotMessage(prev => 
        (prev + 1) % mascotMessages[language].length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);

  // Handle scroll for robot movement
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // First time scroll down - move robot to corner permanently
      if (currentScrollY > 100 && robotPosition === 'hero' && !hasMovedToCorner) {
        setRobotPosition('moving');
        setHasMovedToCorner(true);
        setTimeout(() => {
          setRobotPosition('chatbot');
          playSound('success');
        }, 2000); // 2 second animation duration
      }
      // Return robot to hero only when scrolled to very top (0-20px) after it has moved
      else if (currentScrollY <= 20 && hasMovedToCorner && robotPosition === 'chatbot') {
        setRobotPosition('moving');
        setTimeout(() => {
          setRobotPosition('hero');
          setHasMovedToCorner(false);
        }, 1500); // Smooth transition back to hero
      }
      // Move back to corner when leaving hero section after returning
      else if (currentScrollY > 100 && robotPosition === 'hero') {
        setRobotPosition('moving');
        setTimeout(() => {
          setRobotPosition('chatbot');
        }, 1500); // Smooth transition to corner
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [robotPosition, hasMovedToCorner, playSound]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
    
    // Show daily tip after 3 seconds if not shown today
    const lastTipDate = localStorage.getItem('lastDailyTip');
    const today = new Date().toDateString();
    if (lastTipDate !== today) {
      setTimeout(() => {
        setShowDailyTip(true);
        localStorage.setItem('lastDailyTip', today);
      }, 3000);
    }
  }, [token]);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const coursesRes = await axiosInstance.get("courses/", {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(language === 'en' ? 'Oops! Loading your adventure...' : 'عذراً! جاري تحميل مغامرتك...');
    } finally {
      setLoading(false);
    }
  }, [token, userId, language]);

  const handleStartAdventure = () => {
    playSound('success');
    if (token) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  };

  const learningPaths = useMemo(() => [
    {
      id: 'beginner',
      title: language === 'en' ? 'Beginner Island' : 'جزيرة المبتدئين',
      description: language === 'en' ? 'Start your magical coding adventure! Learn the basics of programming through fun games and interactive challenges that will spark your creativity!' : 'ابدأ مغامرتك السحرية في البرمجة! تعلم أساسيات البرمجة من خلال ألعاب ممتعة وتحديات تفاعلية ستشعل إبداعك!',
      icon: '🏝️',
      color: '#4ECDC4',
      bgColor: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
      level: language === 'en' ? 'Beginner' : 'مبتدئ',
      lessons: 12,
      unlocked: true,
      progress: userProgress?.beginnerProgress || 0
    },
    {
      id: 'intermediate', 
      title: language === 'en' ? 'Space Station' : 'محطة الفضاء',
      description: language === 'en' ? 'Blast off to advanced coding adventures! Build amazing projects and explore the galaxy of programming possibilities!' : 'انطلق في مغامرات برمجة متقدمة! ابني مشاريع رائعة واستكشف مجرة إمكانيات البرمجة!',
      icon: '🚀',
      color: '#667EEA', 
      bgColor: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
      level: language === 'en' ? 'Intermediate' : 'متوسط',
      lessons: 18,
      unlocked: (userProgress?.completedLessons || 0) >= 10,
      progress: userProgress?.intermediateProgress || 0
    },
    {
      id: 'advanced',
      title: language === 'en' ? 'Mystery World' : 'عالم الغموض',
      description: language === 'en' ? 'Unlock the secrets of advanced programming! Master complex algorithms and create incredible applications!' : 'اكتشف أسرار البرمجة المتقدمة! أتقن الخوارزميات المعقدة وأنشئ تطبيقات لا تصدق!',
      icon: '🌟',
      color: '#F093FB',
      bgColor: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
      level: language === 'en' ? 'Advanced' : 'متقدم', 
      lessons: 24,
      unlocked: (userProgress?.completedLessons || 0) >= 25,
      progress: userProgress?.advancedProgress || 0
    }
  ], [language, userProgress]);

  return (
    <div className={`enhanced-home ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background">
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <AnimatePresence>
              {robotPosition === 'hero' && (
                <motion.div
                  className="mascot-container"
                  initial={{ 
                    x: hasMovedToCorner ? window.innerWidth - 80 : 0,
                    y: hasMovedToCorner ? window.innerHeight - 80 : 0,
                    scale: hasMovedToCorner ? 0.6 : 1
                  }}
                  animate={{ 
                    x: 0,
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                    scale: 1
                  }}
                  exit={{
                    x: window.innerWidth - 80,
                    y: window.innerHeight - 80,
                    scale: 0.6,
                    transition: { duration: 2, ease: "easeInOut" }
                  }}
                  transition={{ 
                    duration: hasMovedToCorner ? 1.5 : 3,
                    repeat: robotPosition === 'hero' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  <div className="mascot-robot">
                    <FaRobot />
                    <motion.div 
                      className="mascot-speech"
                      key={currentMascotMessage}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {mascotMessages[language][currentMascotMessage]}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hero-right">
            <motion.h1
              className="hero-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {token ? (
                <>
                  {language === 'en' ? `Hi ${userName}!` : `مرحباً ${userName}!`}
                  <br />
                  <span className="title-subtitle">
                    {language === 'en' ? 'Ready for more coding fun?' : 'مستعد للمزيد من متعة البرمجة؟'}
                  </span>
                </>
              ) : (
                <>
                  {language === 'en' ? 'Code4Kids' : 'كود للأطفال'}
                  <br />
                  <span className="title-subtitle">
                    {language === 'en' ? 'Learn Programming the Fun Way!' : 'تعلم البرمجة بطريقة ممتعة!'}
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {language === 'en' 
                ? 'Learn coding with games, quizzes, and your AI friend!'
                : 'تعلم البرمجة مع الألعاب والاختبارات وصديقك الذكي!'}
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {loading ? (
                <motion.div
                  className="loading-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FaSpinner className="spinner" />
                  <span>{language === 'en' ? 'Loading your adventure...' : 'جاري تحميل مغامرتك...'}</span>
                </motion.div>
              ) : error ? (
                <motion.div
                  className="error-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FaExclamationTriangle />
                  <span>{error}</span>
                  <button onClick={fetchUserData} className="retry-btn">
                    {language === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.button
                    className="start-adventure-btn"
                    onClick={handleStartAdventure}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 107, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => playSound('hover')}
                  >
                    <FaRocket />
                    {token 
                      ? (language === 'en' ? 'Continue Learning' : 'واصل التعلم')
                      : (language === 'en' ? 'Start Adventure' : 'ابدأ المغامرة')
                    }
                  </motion.button>

                  {userProgress && (
                    <motion.div
                      className="progress-welcome"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <FaTrophy />
                      <span>
                        {language === 'en' 
                          ? `${userProgress.badges || 0} badges earned! ${userProgress.completedLessons || 0} lessons completed!`
                          : `حصلت على ${userProgress.badges || 0} شارات! أكملت ${userProgress.completedLessons || 0} درس!`}
                      </span>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Learning Paths Section - Adventure Journey */}
      <motion.section 
        className="adventure-journey-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Floating Background Elements */}
        <div className="adventure-background">
          <div className="floating-elements">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`floating-element ${i % 4 === 0 ? 'star' : i % 4 === 1 ? 'cloud' : i % 4 === 2 ? 'code' : 'heart'}`}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </div>

        <div className="section-container">
          <motion.div
            className="section-header adventure-journey-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>🚀 {language === 'en' ? 'Choose Your Adventure Path!' : 'اختر مسار مغامرتك!'} ✨</h2>
            <p>{language === 'en' ? 'Embark on an epic coding journey through magical worlds!' : 'انطلق في رحلة برمجة ملحمية عبر عوالم سحرية!'}</p>
          </motion.div>

          {/* Adventure Path Journey */}
          <div className="adventure-journey-path">
            {/* Visual Pathway */}
            <div className="journey-pathway">
              <svg className="pathway-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD93D" />
                    <stop offset="50%" stopColor="#FF6B9D" />
                    <stop offset="100%" stopColor="#4ECDC4" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 50 Q80 200 50 350 Q20 500 50 650 Q80 750 50 800"
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  fill="none"
                  opacity="0.6"
                />
                {/* Pathway Stars */}
                {[150, 350, 550].map((y, i) => (
                  <motion.circle
                    key={i}
                    cx="50"
                    cy={y}
                    r="8"
                    fill="#FFD93D"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.3 + 1, duration: 0.5 }}
                  />
                ))}
              </svg>
            </div>

            {/* Adventure Levels */}
            <div className="journey-levels">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  className={`journey-level ${index % 2 === 0 ? 'level-right' : 'level-left'} ${!path.unlocked ? 'locked' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.4, duration: 0.8, type: "spring", bounce: 0.3 }}
                >
                  <div className="level-content">
                    {/* Card Side */}
                    <motion.div 
                      className="level-card"
                      style={{ 
                        '--level-color': path.color,
                        '--level-bg': path.bgColor
                      }}
                      whileHover={path.unlocked ? { 
                        scale: 1.05, 
                        y: -15,
                        rotateY: index % 2 === 0 ? -5 : 5,
                        boxShadow: `0 25px 50px ${path.color}40`
                      } : {}}
                      onClick={() => {
                        if (path.unlocked) {
                          playSound('success');
                          navigate('/courses');
                        }
                      }}
                    >
                      <div className="card-glow"></div>
                      <motion.div 
                        className="level-icon-container"
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: 1.2
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="level-icon">{path.icon}</div>
                        <div className="icon-particles">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="particle"
                              animate={{
                                scale: [0, 1, 0],
                                y: [0, -20, -40],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                      
                      {!path.unlocked && (
                        <div className="lock-overlay">
                          <FaLock className="lock-icon" />
                        </div>
                      )}
                    </motion.div>

                    {/* Text Side */}
                    <div className="level-details">
                      <motion.h3 
                        className="level-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.4 + 0.2 }}
                      >
                        {path.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="level-description"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.4 + 0.3 }}
                      >
                        {path.description}
                      </motion.p>
                      
                      <motion.div 
                        className="level-stats"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.4 + 0.4 }}
                      >
                        <div className="stat-item">
                          <FaGraduationCap />
                          <span>{path.level}</span>
                        </div>
                        <div className="stat-item">
                          <FaCode />
                          <span>{path.lessons} {language === 'en' ? 'lessons' : 'درس'}</span>
                        </div>
                      </motion.div>
                      
                      {path.unlocked && path.progress > 0 && (
                        <motion.div 
                          className="level-progress"
                          initial={{ opacity: 0, width: 0 }}
                          whileInView={{ opacity: 1, width: '100%' }}
                          transition={{ delay: index * 0.4 + 0.6, duration: 1 }}
                        >
                          <div className="progress-track">
                            <motion.div 
                              className="progress-fill" 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(path.progress / path.lessons) * 100}%` }}
                              transition={{ delay: index * 0.4 + 0.8, duration: 1.5 }}
                            />
                          </div>
                          <span className="progress-label">
                            {Math.round((path.progress / path.lessons) * 100)}% {language === 'en' ? 'Complete' : 'مكتمل'}
                          </span>
                        </motion.div>
                      )}
                      
                      <motion.button
                        className={`level-explore-btn ${!path.unlocked ? 'locked' : ''}`}
                        disabled={!path.unlocked}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.4 + 0.7 }}
                        whileHover={path.unlocked ? { 
                          scale: 1.1,
                          boxShadow: `0 10px 30px ${path.color}50`
                        } : {}}
                        whileTap={path.unlocked ? { scale: 0.95 } : {}}
                      >
                        {!path.unlocked ? (
                          <>
                            <FaLock />
                            {language === 'en' ? 'Coming Soon' : 'قريباً'}
                          </>
                        ) : (
                          <>
                            <FaRocket />
                            {language === 'en' ? 'Start Adventure!' : 'ابدأ المغامرة!'}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Visual Break Section - Animated Robot Journey */}
      <motion.section 
        className="visual-break-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="break-container">
          {/* Animated Robot */}
          <motion.div
            className="journey-robot"
            animate={{
              x: ['-100px', 'calc(100vw + 100px)']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaRobot />
            {/* Robot Trail */}
            <div className="robot-trail"></div>
          </motion.div>

          {/* Floating Programming Elements */}
          <div className="floating-code-elements">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`code-element ${i % 4 === 0 ? 'bracket' : i % 4 === 1 ? 'star' : i % 4 === 2 ? 'code-tag' : 'gear'}`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  left: `${10 + (i * 8)}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
              />
            ))}
          </div>

          {/* Central Motivational Text */}
          <motion.div
            className="break-content"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <h3>
              {language === 'en' 
                ? '🚀 Continue the Adventure... There\'s More to Discover! ✨' 
                : '🚀 تابع المغامرة... هناك المزيد لتكتشفه! ✨'}
            </h3>
          </motion.div>


          {/* Glowing Particles */}
          <div className="glowing-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 200 - 100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Color Magic Game - Interactive Demo */}
      <ColorMagicGame 
        language={language} 
        playSound={playSound}
      />

      {/* Learning Journey Section */}
      <LearningJourney />

      {/* Visual Break */}
      <VisualBreak variant="journey" />


      {/* Game-Style Features Section - Horizontal Scrolling */}
      <motion.section 
        className="game-features-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Elements */}
        <div className="game-background">
          <div className="floating-game-elements">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`game-element game-${i % 5}`}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                {i % 5 === 0 && '⭐'}
                {i % 5 === 1 && '💎'}
                {i % 5 === 2 && '🎯'}
                {i % 5 === 3 && '🚀'}
                {i % 5 === 4 && '⚡'}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="game-container">
          <motion.div
            className="game-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>
              {language === 'en' ? (
                <>🎮 Power-Up Your Skills! ⚡</>
              ) : (
                <>🎮 قوّي مهاراتك! ⚡</>
              )}
            </h2>
            <p>
              {language === 'en' 
                ? 'Collect amazing features and unlock your coding superpowers!'
                : 'اجمع المميزات الرائعة وافتح قوى البرمجة الخارقة!'
              }
            </p>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <div className="features-scroll-wrapper">
            <div className="features-scroll-container">
              {[
                {
                  shape: 'hexagon',
                  icon: '🤖',
                  title: language === 'en' ? 'AI Buddy' : 'الصديق الذكي',
                  subtitle: language === 'en' ? 'Smart Helper' : 'مساعد ذكي',
                  description: language === 'en' ? 'Your coding companion that helps 24/7!' : 'رفيق البرمجة الذي يساعدك 24/7!',
                  color: '#9B59B6',
                  gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
                  level: 'LEGENDARY'
                },
                {
                  shape: 'circle',
                  icon: '🎮',
                  title: language === 'en' ? 'Game Learning' : 'تعلم بالألعاب',
                  subtitle: language === 'en' ? 'Play & Code' : 'العب وبرمج',
                  description: language === 'en' ? 'Turn coding into epic adventures!' : 'حول البرمجة إلى مغامرات ملحمية!',
                  color: '#E67E22',
                  gradient: 'linear-gradient(135deg, #E67E22, #D35400)',
                  level: 'EPIC'
                },
                {
                  shape: 'diamond',
                  icon: '🏆',
                  title: language === 'en' ? 'Achievements' : 'الإنجازات',
                  subtitle: language === 'en' ? 'Collect & Win' : 'اجمع واربح',
                  description: language === 'en' ? 'Earn badges and show off your skills!' : 'احصل على شارات واستعرض مهاراتك!',
                  color: '#3498DB',
                  gradient: 'linear-gradient(135deg, #3498DB, #2980B9)',
                  level: 'RARE'
                },
                {
                  shape: 'octagon',
                  icon: '🎨',
                  title: language === 'en' ? 'Creative Studio' : 'استوديو الإبداع',
                  subtitle: language === 'en' ? 'Build & Create' : 'ابن وأبدع',
                  description: language === 'en' ? 'Create amazing games and apps!' : 'أنشئ ألعاباً وتطبيقات رائعة!',
                  color: '#27AE60',
                  gradient: 'linear-gradient(135deg, #27AE60, #229954)',
                  level: 'EPIC'
                },
                {
                  shape: 'star',
                  icon: '👨‍👩‍👧‍👦',
                  title: language === 'en' ? 'Family Hub' : 'مركز العائلة',
                  subtitle: language === 'en' ? 'Track Progress' : 'تتبع التقدم',
                  description: language === 'en' ? 'Parents join the coding adventure!' : 'الوالدان ينضمان لمغامرة البرمجة!',
                  color: '#E74C3C',
                  gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)',
                  level: 'RARE'
                },
                {
                  shape: 'pentagon',
                  icon: '🛡️',
                  title: language === 'en' ? 'Safe Zone' : 'المنطقة الآمنة',
                  subtitle: language === 'en' ? 'Protected Fun' : 'متعة محمية',
                  description: language === 'en' ? 'Learn in a safe, kid-friendly space!' : 'تعلم في مساحة آمنة وصديقة للأطفال!',
                  color: '#F39C12',
                  gradient: 'linear-gradient(135deg, #F39C12, #E67E22)',
                  level: 'LEGENDARY'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`game-feature-card ${feature.shape}-card`}
                  style={{ 
                    '--feature-color': feature.color,
                    '--feature-gradient': feature.gradient
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -20,
                    rotateZ: feature.shape === 'circle' ? 0 : 5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Level Badge */}
                  <div className="level-badge">
                    <span>{feature.level}</span>
                  </div>

                  {/* Shape Container */}
                  <div className={`shape-container ${feature.shape}`}>
                    {/* Animated Border */}
                    <motion.div 
                      className="animated-border"
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Icon */}
                    <motion.div 
                      className="game-icon"
                      whileHover={{ 
                        scale: 1.3,
                        rotate: [0, -15, 15, -15, 0]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="icon-emoji">{feature.icon}</span>
                      <div className="icon-shine"></div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="game-content">
                    <h3>{feature.title}</h3>
                    <span className="game-subtitle">{feature.subtitle}</span>
                    <p>{feature.description}</p>
                  </div>

                  {/* Power Meter */}
                  <div className="power-meter">
                    <div className="meter-fill"></div>
                    <span className="power-text">
                      {language === 'en' ? 'POWER' : 'قوة'}
                    </span>
                  </div>

                  {/* Particle Effects */}
                  <div className="particle-effects">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`particle particle-${i}`}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [0, -30, -60]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2 + index * 0.1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <motion.div 
              className="scroll-hint"
              animate={{ x: [0, 30, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>
                {language === 'en' ? '👆 Drag to explore more powers!' : '👆 اسحب لاستكشاف المزيد من القوى!'}
              </span>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="game-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="unlock-powers-btn"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(155, 89, 182, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
            >
              {language === 'en' ? '🔓 Unlock All Powers!' : '🔓 افتح جميع القوى!'}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Join Family CTA Section */}
      <motion.section 
        className="join-family-cta-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="join-family-container">
          <div className="join-family-content">
            <motion.div
              className="join-family-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>
                {language === 'en' ? (
                  <>
                    Want to become<br />
                    a part of the<br />
                    <span className="brand-highlight">Code4Kids</span> family?
                  </>
                ) : (
                  <>
                    هل تريد أن تصبح<br />
                    جزءاً من عائلة<br />
                    <span className="brand-highlight">كود للأطفال</span>؟
                  </>
                )}
              </h2>
            </motion.div>

            <motion.div
              className="join-family-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>
                {language === 'en' 
                  ? 'Join thousands of students all over the world in learning to code. Take part in awesome free events, giveaways, and more!'
                  : 'انضم إلى آلاف الطلاب حول العالم في تعلم البرمجة. شارك في فعاليات مجانية رائعة وهدايا والمزيد!'
                }
              </p>
              
              <motion.button
                className="join-family-btn"
                onClick={() => {
                  playSound && playSound('success');
                  navigate('/register');
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(255, 165, 0, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {language === 'en' ? 'Sign me up!' : 'سجلني!'}
              </motion.button>
            </motion.div>
          </div>

          {/* Background decorative elements */}
          <div className="join-family-decorations">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`decoration decoration-${i % 4}`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Daily Tip Modal */}
      <AnimatePresence>
        {showDailyTip && (
          <motion.div
            className="daily-tip-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDailyTip(false)}
          >
            <motion.div
              className="daily-tip-modal"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tip-header">
                <div className="tip-icon">💡</div>
                <h3>{language === 'en' ? 'Daily Coding Tip!' : 'نصيحة البرمجة اليومية!'}</h3>
                <button onClick={() => setShowDailyTip(false)}>×</button>
              </div>
              <div className="tip-content">
                <p>
                  {language === 'en'
                    ? "Did you know? The best way to learn coding is by practicing a little bit every day! Even 10 minutes can make a big difference! 🚀"
                    : "هل تعلم؟ أفضل طريقة لتعلم البرمجة هي الممارسة قليلاً كل يوم! حتى 10 دقائق يمكن أن تحدث فرقاً كبيراً! 🚀"}
                </p>
                <motion.button
                  className="tip-button"
                  onClick={() => setShowDailyTip(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'en' ? 'Got it!' : 'فهمت!'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
   
      
      {/* FloatingChatbot Component */}
      <FloatingChatbot />
    </div>
  );
};

// Memoize the component for better performance
export default React.memo(EnhancedHome);
