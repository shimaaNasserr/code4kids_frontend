import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaRocket, FaGamepad, FaTrophy, FaRobot, FaStar, FaHeart, FaCode, FaPuzzlePiece, FaUsers, FaGift, FaSpinner, FaExclamationTriangle, FaChild, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import SimpleDragDemo from '../../components/DragDropDemo/SimpleDragDemo';
import FloatingChatbot from '../../components/FloatingChatbot/FloatingChatbot';
import axiosInstance from "../../apis/config";
import './Home.css';

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

  const token = localStorage.getItem("userToken");
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMascotMessage(prev => 
        (prev + 1) % mascotMessages[language].length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);

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
      description: language === 'en' ? 'Start your coding journey here!' : 'ابدأ رحلة البرمجة هنا!',
      icon: '🏝️',
      color: '#81C784',
      level: language === 'en' ? 'Beginner' : 'مبتدئ',
      lessons: 12,
      unlocked: true,
      progress: userProgress?.beginnerProgress || 0
    },
    {
      id: 'intermediate', 
      title: language === 'en' ? 'Space Station' : 'محطة الفضاء',
      description: language === 'en' ? 'Advanced coding adventures!' : 'مغامرات برمجة متقدمة!',
      icon: '🚀',
      color: '#64B5F6', 
      level: language === 'en' ? 'Intermediate' : 'متوسط',
      lessons: 18,
      unlocked: (userProgress?.completedLessons || 0) >= 10,
      progress: userProgress?.intermediateProgress || 0
    },
    {
      id: 'advanced',
      title: language === 'en' ? 'Mystery World' : 'عالم الغموض',
      description: language === 'en' ? 'Coming soon!' : 'قريباً!',
      icon: '🌟',
      color: '#FFB74D',
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
            <motion.div
              className="mascot-container"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
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

      {/* Learning Paths Section */}
      <motion.section 
        className="learning-paths-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <h2>{language === 'en' ? 'Choose Your Adventure Path!' : 'اختر مسار مغامرتك!'}</h2>
          <p>{language === 'en' ? 'Each path is designed for different skill levels' : 'كل مسار مصمم لمستويات مهارة مختلفة'}</p>
        </div>

        <div className="paths-grid">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              className={`path-card ${!path.unlocked ? 'locked' : ''}`}
              style={{ '--path-color': path.color }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={path.unlocked ? { 
                scale: 1.05, 
                y: -10,
                boxShadow: `0 20px 40px ${path.color}40`
              } : {}}
              onClick={() => {
                if (path.unlocked) {
                  playSound('success');
                  navigate('/courses');
                }
              }}
            >
              <div className="path-icon">{path.icon}</div>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="path-info">
                <span className="path-level">{path.level}</span>
                <span className="path-lessons">
                  {path.lessons} {language === 'en' ? 'lessons' : 'درس'}
                </span>
              </div>
              
              {path.unlocked && path.progress > 0 && (
                <div className="path-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(path.progress / path.lessons) * 100}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    {Math.round((path.progress / path.lessons) * 100)}% {language === 'en' ? 'Complete' : 'مكتمل'}
                  </span>
                </div>
              )}
              <motion.button
                className={`path-button ${!path.unlocked ? 'locked' : ''}`}
                disabled={!path.unlocked}
                whileHover={path.unlocked ? { scale: 1.1 } : {}}
                whileTap={path.unlocked ? { scale: 0.9 } : {}}
              >
                {path.unlocked 
                  ? (language === 'en' ? 'Explore' : 'استكشف')
                  : (language === 'en' ? 'Coming Soon' : 'قريباً')}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Coding Teaser - Now Working! */}
      <motion.section 
        className="coding-teaser-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SimpleDragDemo />
      </motion.section>

      {/* Features Showcase */}
      <motion.section 
        className="features-showcase"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="features-grid">
          {[
            {
              icon: <FaRobot />,
              title: language === 'en' ? 'AI Buddy' : 'الصديق الذكي',
              description: language === 'en' ? 'Ask me anything about coding!' : 'اسألني أي شيء عن البرمجة!',
              color: '#FF6B9D',
              action: () => playSound('success') // Chatbot is now floating, no modal needed
            },
            {
              icon: <FaTrophy />,
              title: language === 'en' ? 'Rewards' : 'المكافآت', 
              description: language === 'en' ? 'Earn Cool Badges!' : 'احصل على شارات رائعة!',
              color: '#FFD93D',
              action: () => navigate('/progress')
            },
            {
              icon: <FaGamepad />,
              title: language === 'en' ? 'Games' : 'الألعاب',
              description: language === 'en' ? 'Play & Learn!' : 'العب وتعلم!',
              color: '#4ECDC4',
              action: () => navigate('/games')
            },
            {
              icon: <FaUsers />,
              title: language === 'en' ? 'Parents' : 'الوالدين',
              description: language === 'en' ? 'Track Progress' : 'تتبع التقدم',
              color: '#A8E6CF',
              action: () => navigate('/parent-dashboard')
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              style={{ '--feature-color': feature.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: `0 15px 30px ${feature.color}40`
              }}
              onClick={() => {
                playSound('success');
                feature.action();
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <motion.button
                className="feature-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {language === 'en' ? 'Try Now' : 'جرب الآن'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modern Features Section - Horizontal Scrolling */}
      <motion.section 
        className="modern-features-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{language === 'en' ? 'Why Choose Code4Kids?' : 'لماذا تختار Code4Kids؟'}</h2>
            <p>{language === 'en' ? 'Discover the amazing features that make learning programming fun and engaging!' : 'اكتشف المميزات الرائعة التي تجعل تعلم البرمجة ممتعاً وجذاباً!'}</p>
          </motion.div>

          <div className="features-scroll-container">
            <motion.div 
              className="features-scroll-track"
              drag="x"
              dragConstraints={{ left: -800, right: 0 }}
              dragElastic={0.1}
            >
              {[
                {
                  icon: <FaChild />,
                  title: language === 'en' ? 'Kid-Friendly Interface' : 'واجهة صديقة للأطفال',
                  description: language === 'en' ? 'Colorful and animated visuals designed specifically for young learners with intuitive navigation and engaging elements.' : 'رسوم ملونة ومتحركة مصممة خصيصاً للمتعلمين الصغار مع تنقل بديهي وعناصر جذابة.',
                  color: '#FF6B9D',
                  gradient: 'linear-gradient(135deg, #FF6B9D, #FF8E9B)'
                },
                {
                  icon: <FaGraduationCap />,
                  title: language === 'en' ? 'Structured Learning Paths' : 'مسارات تعلم منظمة',
                  description: language === 'en' ? 'Age and skill-based learning paths from Beginner to Intermediate levels, ensuring progressive skill development.' : 'مسارات تعلم مبنية على العمر والمهارة من المبتدئ إلى المتوسط، مما يضمن تطوير المهارات التدريجي.',
                  color: '#4ECDC4',
                  gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)'
                },
                {
                  icon: <FaPuzzlePiece />,
                  title: language === 'en' ? 'Interactive Lessons & Quizzes' : 'دروس تفاعلية واختبارات',
                  description: language === 'en' ? 'Engaging interactive lessons with short quizzes after each topic to reinforce learning and track understanding.' : 'دروس تفاعلية جذابة مع اختبارات قصيرة بعد كل موضوع لتعزيز التعلم وتتبع الفهم.',
                  color: '#FFD93D',
                  gradient: 'linear-gradient(135deg, #FFD93D, #F8B500)'
                },
                {
                  icon: <FaGamepad />,
                  title: language === 'en' ? 'Game-Based Learning' : 'تعلم قائم على الألعاب',
                  description: language === 'en' ? 'Learn programming through drag-and-drop coding blocks similar to Scratch, making coding feel like playing games.' : 'تعلم البرمجة من خلال كتل برمجة بالسحب والإفلات مشابهة لـ Scratch، مما يجعل البرمجة تبدو مثل اللعب.',
                  color: '#A8E6CF',
                  gradient: 'linear-gradient(135deg, #A8E6CF, #7FCDCD)'
                },
                {
                  icon: <FaRobot />,
                  title: language === 'en' ? 'AI-Powered Assistant' : 'مساعد ذكي مدعوم بالذكاء الاصطناعي',
                  description: language === 'en' ? 'Smart chatbot assistant providing real-time guidance, answering questions, and helping kids navigate lessons and challenges.' : 'مساعد ذكي يوفر إرشادات فورية ويجيب على الأسئلة ويساعد الأطفال في التنقل عبر الدروس والتحديات.',
                  color: '#C44569',
                  gradient: 'linear-gradient(135deg, #C44569, #F8B500)'
                },
                {
                  icon: <FaUsers />,
                  title: language === 'en' ? 'Parent/Teacher Dashboard' : 'لوحة تحكم الوالدين/المعلمين',
                  description: language === 'en' ? 'Comprehensive dashboard for parents and teachers to track children\'s progress, view achievements, and monitor learning activities.' : 'لوحة تحكم شاملة للوالدين والمعلمين لتتبع تقدم الأطفال وعرض الإنجازات ومراقبة أنشطة التعلم.',
                  color: '#54A0FF',
                  gradient: 'linear-gradient(135deg, #54A0FF, #5F27CD)'
                },
                {
                  icon: <FaTrophy />,
                  title: language === 'en' ? 'Badge & Reward System' : 'نظام الشارات والمكافآت',
                  description: language === 'en' ? 'Motivating badge and reward system that celebrates achievements and encourages continuous learning and skill development.' : 'نظام شارات ومكافآت محفز يحتفل بالإنجازات ويشجع على التعلم المستمر وتطوير المهارات.',
                  color: '#5F27CD',
                  gradient: 'linear-gradient(135deg, #5F27CD, #341F97)'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="modern-feature-card"
                  style={{ 
                    '--feature-color': feature.color,
                    '--feature-gradient': feature.gradient
                  }}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -15,
                    boxShadow: `0 25px 50px ${feature.color}30`,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="feature-card-background"></div>
                  <motion.div 
                    className="modern-feature-icon"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="feature-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <motion.div 
                    className="feature-glow"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div className="scroll-indicator">
            <motion.div 
              className="scroll-hint"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>{language === 'en' ? 'Swipe to explore →' : 'اسحب للاستكشاف ←'}</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Dashboard Preview Section */}
      <motion.section 
        className="dashboard-preview-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{language === 'en' ? 'Track Your Progress!' : 'تتبع تقدمك!'}</h2>
            <p>{language === 'en' ? 'See how much you\'ve learned and celebrate your achievements!' : 'شاهد كم تعلمت واحتفل بإنجازاتك!'}</p>
          </motion.div>

          <div className="dashboard-preview-grid">
            {/* Kid Progress View */}
            <motion.div
              className="dashboard-card kid-progress"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <FaChild className="card-icon" />
                <h3>{language === 'en' ? 'My Progress' : 'تقدمي'}</h3>
              </div>
              <div className="progress-content">
                <div className="progress-circle">
                  <div className="progress-fill" style={{ '--progress': '75%' }}>
                    <span className="progress-text">75%</span>
                  </div>
                </div>
                <div className="progress-stats">
                  <div className="stat-item">
                    <span className="stat-number">12</span>
                    <span className="stat-label">{language === 'en' ? 'Lessons' : 'دروس'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">{language === 'en' ? 'Badges' : 'شارات'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Parent Dashboard View */}
            <motion.div
              className="dashboard-card parent-dashboard"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <FaUsers className="card-icon" />
                <h3>{language === 'en' ? 'Parent Dashboard' : 'لوحة تحكم الوالدين'}</h3>
              </div>
              <div className="dashboard-content">
                <div className="chart-container">
                  <div className="chart-title">{language === 'en' ? 'Weekly Activity' : 'النشاط الأسبوعي'}</div>
                  <div className="chart-bars">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                    <div className="chart-bar" style={{ height: '85%' }}></div>
                    <div className="chart-bar" style={{ height: '75%' }}></div>
                  </div>
                  <div className="chart-labels">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>
                </div>
                <div className="dashboard-stats">
                  <div className="stat-item">
                    <span className="stat-number">3.5</span>
                    <span className="stat-label">{language === 'en' ? 'Hours/week' : 'ساعات/أسبوع'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action Card */}
            <motion.div
              className="dashboard-card cta-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <FaRocket className="card-icon" />
                <h3>{language === 'en' ? 'Ready to Start?' : 'مستعد للبدء؟'}</h3>
              </div>
              <div className="cta-content">
                <p>{language === 'en' ? 'Join thousands of kids learning to code!' : 'انضم إلى آلاف الأطفال الذين يتعلمون البرمجة!'}</p>
                <motion.button
                  className="start-trial-btn"
                  onClick={() => {
                    playSound && playSound('success');
                    navigate('/register');
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRocket />
                  {language === 'en' ? 'Start Free Trial' : 'ابدأ التجربة المجانية'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <motion.h2
            animate={{ 
              color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#ff6b6b']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {language === 'en' ? 'Ready to Start Your Coding Journey?' : 'مستعد لبدء رحلة البرمجة؟'}
          </motion.h2>
          
          <div className="cta-buttons">
            {!token ? (
              <>
                <motion.button
                  className="cta-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound('success');
                    navigate('/register');
                  }}
                >
                  <FaRocket />
                  {language === 'en' ? 'Sign Up' : 'اشترك'}
                </motion.button>
                
                <motion.button
                  className="cta-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound('click');
                    navigate('/login');
                  }}
                >
                  {language === 'en' ? 'Log In' : 'تسجيل الدخول'}
                </motion.button>
              </>
            ) : (
              <motion.button
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('success');
                  navigate('/courses');
                }}
              >
                <FaTrophy />
                {language === 'en' ? 'Continue Learning' : 'واصل التعلم'}
              </motion.button>
            )}
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
   
      
      {/* Floating Chatbot - Single Instance */}
      <FloatingChatbot />
    </div>
  );
};

// Memoize the component for better performance
export default React.memo(EnhancedHome);
