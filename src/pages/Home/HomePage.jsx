import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaGamepad, FaTrophy, FaRobot, FaStar, FaHeart, FaCode, FaPuzzlePiece, FaUsers, FaGift, FaSpinner, FaExclamationTriangle, FaChild, FaBrain, FaGraduationCap, FaGlobe, FaChartLine, FaPlay } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import Navbar from '../../components/NavBar/Navbar';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentMascotMessage, setCurrentMascotMessage] = useState(0);
  const [currentDashboardView, setCurrentDashboardView] = useState('parent');
  
  // Add error boundary for useLanguage hook
  let languageContext;
  try {
    languageContext = useLanguage();
  } catch (err) {
    console.error('Language context error in HomePage:', err);
    languageContext = {
      language: 'en',
      playSound: () => {},
      isRTL: false
    };
  }
  
  const { language, playSound, isRTL } = languageContext;

  // Mascot messages
  const mascotMessages = {
    en: [
      "Ready for an amazing coding adventure?! 🚀",
      "Let's build something awesome together! ✨",
      "Coding is like magic - let me show you! 🪄",
      "Hi there, young coder! 🎮"
    ],
    ar: [
      "مستعد لمغامرة برمجة رائعة؟! 🚀",
      "دعنا نبني شيئاً رائعاً معاً! ✨",
      "البرمجة مثل السحر - دعني أريك! 🪄",
      "مرحباً أيها المبرمج الصغير! 🎮"
    ]
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMascotMessage(prev => 
        (prev + 1) % mascotMessages[language].length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);

  const handleStartAdventure = () => {
    playSound && playSound('success');
    navigate('/register');
  };

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
    playSound && playSound('click');
  };

  const features = [
    {
      icon: <FaChild />,
      title: language === 'en' ? 'Kid-Friendly UI' : 'واجهة صديقة للأطفال',
      description: language === 'en' ? 'Colorful visuals and intuitive design' : 'رسوم ملونة وتصميم بديهي',
      color: '#FF6B9D'
    },
    {
      icon: <FaGraduationCap />,
      title: language === 'en' ? 'Structured Learning' : 'تعلم منظم',
      description: language === 'en' ? 'Beginner to Intermediate paths' : 'مسارات من المبتدئ إلى المتوسط',
      color: '#4ECDC4'
    },
    {
      icon: <FaGamepad />,
      title: language === 'en' ? 'Game-Based Learning' : 'تعلم قائم على الألعاب',
      description: language === 'en' ? 'Drag & drop coding blocks like Scratch' : 'كتل برمجة بالسحب والإفلات مثل Scratch',
      color: '#FFD93D'
    },
    {
      icon: <FaBrain />,
      title: language === 'en' ? 'AI-Powered Chatbot' : 'روبوت محادثة ذكي',
      description: language === 'en' ? 'Real-time guidance and help' : 'إرشاد ومساعدة فورية',
      color: '#A8E6CF'
    },
    {
      icon: <FaUsers />,
      title: language === 'en' ? 'Parent Dashboard' : 'لوحة تحكم الوالدين',
      description: language === 'en' ? 'Track your child\'s progress' : 'تتبع تقدم طفلك',
      color: '#C44569'
    },
    {
      icon: <FaTrophy />,
      title: language === 'en' ? 'Badge System' : 'نظام الشارات',
      description: language === 'en' ? 'Earn rewards and stay motivated' : 'احصل على مكافآت وابق متحمساً',
      color: '#F8B500'
    },
    {
      icon: <FaGlobe />,
      title: language === 'en' ? 'Bilingual Support' : 'دعم ثنائي اللغة',
      description: language === 'en' ? 'Arabic and English available' : 'متوفر بالعربية والإنجليزية',
      color: '#54A0FF'
    },
    {
      icon: <FaCode />,
      title: language === 'en' ? 'Real Programming' : 'برمجة حقيقية',
      description: language === 'en' ? 'Learn actual coding concepts' : 'تعلم مفاهيم البرمجة الحقيقية',
      color: '#5F27CD'
    }
  ];

  return (
    <div className={`homepage ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Zigzag Background Pattern */}
      <div className="zigzag-background">
        <div className="zigzag-pattern"></div>
        <div className="floating-shapes">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`floating-shape shape-${i % 4}`}
              animate={{
                y: [-20, -100, -20],
                x: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <motion.div
              className="robot-character"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="robot-body">
                <div className="robot-head">
                  <div className="robot-eyes">
                    <div className="eye left-eye"></div>
                    <div className="eye right-eye"></div>
                  </div>
                  <div className="robot-mouth"></div>
                </div>
                <div className="robot-arms">
                  <div className="arm left-arm"></div>
                  <div className="arm right-arm"></div>
                </div>
                <div className="robot-legs">
                  <div className="leg left-leg"></div>
                  <div className="leg right-leg"></div>
                </div>
              </div>
              
              <motion.div 
                className="speech-bubble"
                key={currentMascotMessage}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p>{mascotMessages[language][currentMascotMessage]}</p>
                <div className="bubble-tail"></div>
              </motion.div>
            </motion.div>

            {/* Additional Character - Kid */}
            <motion.div
              className="kid-character"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="kid-avatar">👦</div>
              <div className="kid-text">
                {language === 'en' ? 'Join me!' : 'انضم إلي!'}
              </div>
            </motion.div>
          </div>

          <div className="hero-right">
            <motion.h1
              className="hero-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {language === 'en' ? 'Code4Kids' : 'كود للأطفال'}
              <br />
              <span className="title-subtitle">
                {language === 'en' ? 'Learn Programming the Fun Way!' : 'تعلم البرمجة بطريقة ممتعة!'}
              </span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {language === 'en' 
                ? 'Learn coding with games, quizzes, and your AI friend!'
                : 'تعلم البرمجة مع الألعاب والاختبارات وصديقك الذكي!'}
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                className="start-adventure-btn"
                onClick={handleStartAdventure}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => playSound && playSound('hover')}
              >
                <FaRocket />
                {language === 'en' ? 'Start Adventure' : 'ابدأ المغامرة'}
              </motion.button>

              <motion.button
                className="chatbot-btn"
                onClick={handleChatbotToggle}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => playSound && playSound('hover')}
              >
                <FaRobot />
                {language === 'en' ? 'Chatbot' : 'المحادثة'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{language === 'en' ? 'Why Choose Code4Kids?' : 'لماذا تختار Code4Kids؟'}</h2>
            <p>{language === 'en' ? 'Discover the amazing features that make learning fun!' : 'اكتشف المميزات الرائعة التي تجعل التعلم ممتعاً!'}</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                style={{ '--feature-color': feature.color }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 15px 30px ${feature.color}40`
                }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Dashboard Preview Section */}
      <section className="dashboard-preview-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{language === 'en' ? 'Track Progress & Celebrate Success!' : 'تتبع التقدم واحتفل بالنجاح!'}</h2>
            <p>{language === 'en' ? 'See how our interactive dashboards help parents and kids stay engaged' : 'شاهد كيف تساعد لوحات التحكم التفاعلية الآباء والأطفال على البقاء متفاعلين'}</p>
          </motion.div>

          <div className="dashboard-toggle">
            <motion.button
              className={`toggle-btn ${currentDashboardView === 'parent' ? 'active' : ''}`}
              onClick={() => setCurrentDashboardView('parent')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUsers />
              {language === 'en' ? 'Parent View' : 'عرض الوالدين'}
            </motion.button>
            <motion.button
              className={`toggle-btn ${currentDashboardView === 'kid' ? 'active' : ''}`}
              onClick={() => setCurrentDashboardView('kid')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChild />
              {language === 'en' ? 'Kid View' : 'عرض الطفل'}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {currentDashboardView === 'parent' ? (
              <motion.div
                key="parent"
                className="dashboard-preview parent-dashboard"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="dashboard-card">
                  <div className="card-header">
                    <FaChartLine className="card-icon" />
                    <h3>{language === 'en' ? 'Parent Dashboard' : 'لوحة تحكم الوالدين'}</h3>
                  </div>
                  <div className="progress-overview">
                    <div className="progress-circle">
                      <div className="circle-progress" style={{ '--progress': '75%' }}>
                        <span className="progress-text">75%</span>
                      </div>
                      <p>{language === 'en' ? 'Overall Progress' : 'التقدم العام'}</p>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-number">12</span>
                        <span className="stat-label">{language === 'en' ? 'Lessons Completed' : 'دروس مكتملة'}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">8</span>
                        <span className="stat-label">{language === 'en' ? 'Badges Earned' : 'شارات حصل عليها'}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">45</span>
                        <span className="stat-label">{language === 'en' ? 'Hours Learned' : 'ساعات تعلم'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="kid"
                className="dashboard-preview kid-dashboard"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="dashboard-card">
                  <div className="card-header">
                    <FaTrophy className="card-icon" />
                    <h3>{language === 'en' ? 'My Achievements' : 'إنجازاتي'}</h3>
                  </div>
                  <div className="achievements-overview">
                    <div className="progress-circle">
                      <div className="circle-progress" style={{ '--progress': '60%' }}>
                        <span className="progress-text">60%</span>
                      </div>
                      <p>{language === 'en' ? 'Level Progress' : 'تقدم المستوى'}</p>
                    </div>
                    <div className="badges-collection">
                      <div className="badge earned">🏆</div>
                      <div className="badge earned">⭐</div>
                      <div className="badge earned">🎯</div>
                      <div className="badge locked">🔒</div>
                      <div className="badge locked">🔒</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="cta-dashboard"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="section-container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{language === 'en' ? 'Ready to Start Your Coding Journey?' : 'مستعد لبدء رحلة البرمجة؟'}</h2>
            <p>{language === 'en' ? 'Join thousands of kids learning to code!' : 'انضم إلى آلاف الأطفال الذين يتعلمون البرمجة!'}</p>
            
            <div className="cta-buttons">
              <motion.button
                className="cta-primary"
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
              
              <motion.button
                className="cta-secondary"
                onClick={() => {
                  playSound && playSound('click');
                  navigate('/login');
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Footer Section */}
      <footer className="footer-section">
        <div className="section-container">
          <div className="footer-content">
            <div className="footer-brand">
              <motion.div
                className="footer-logo"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <FaRobot className="footer-icon" />
                <h3>{language === 'en' ? 'Code4Kids' : 'كود للأطفال'}</h3>
              </motion.div>
              <p>{language === 'en' ? 'Making programming fun and accessible for every child!' : 'نجعل البرمجة ممتعة ومتاحة لكل طفل!'}</p>
            </div>
            <div className="footer-links">
              <div className="links-column">
                <h4>{language === 'en' ? 'Learn' : 'تعلم'}</h4>
                <Link to="/courses">{language === 'en' ? 'Courses' : 'الدورات'}</Link>
                <Link to="/lessons">{language === 'en' ? 'Lessons' : 'الدروس'}</Link>
                <Link to="/games">{language === 'en' ? 'Games' : 'الألعاب'}</Link>
              </div>
              <div className="links-column">
                <h4>{language === 'en' ? 'Support' : 'الدعم'}</h4>
                <Link to="/help">{language === 'en' ? 'Help Center' : 'مركز المساعدة'}</Link>
                <Link to="/contact">{language === 'en' ? 'Contact' : 'اتصل بنا'}</Link>
                <Link to="/faq">{language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</Link>
              </div>
              <div className="links-column">
                <h4>{language === 'en' ? 'Company' : 'الشركة'}</h4>
                <Link to="/about">{language === 'en' ? 'About Us' : 'من نحن'}</Link>
                <Link to="/privacy">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>
                <Link to="/terms">{language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Code4Kids. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
            <div className="footer-social">
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📧
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📱
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🌐
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Help Tooltip */}
      {showChatbot && (
        <motion.div
          className="chatbot-tooltip"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="tooltip-content">
            <FaRobot className="tooltip-icon" />
            <p>{language === 'en' ? 'Need help? Ask me!' : 'تحتاج مساعدة؟ اسألني!'}</p>
            <button 
              className="close-tooltip"
              onClick={handleChatbotToggle}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(HomePage);
