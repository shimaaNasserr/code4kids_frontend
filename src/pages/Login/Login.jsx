import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaRocket, FaChild, FaUsers, FaSpinner, FaExclamationTriangle, FaEnvelope, FaLock, FaCode, FaUser, FaGraduationCap, FaChalkboardTeacher, FaRobot } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useLanguage } from '../../components/NavBar/Navbar';
import RobotCharacter from '../../components/RobotCharacter/RobotCharacter';
// import RegisterSection from '../../components/RegisterSection/RegisterSection';
import axiosInstance from "../../apis/config";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {


  const { login } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Kid',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mascotMessage, setMascotMessage] = useState(0);
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  
  // Add error boundary for useLanguage hook
  let languageContext;
  try {
    languageContext = useLanguage();
  } catch (err) {
    console.error('Language context error in Login:', err);
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
      "Welcome back, young coder! 🚀",
      "Ready for more coding adventures? ✨",
      "Let's continue your coding journey! 🎮",
      "Great to see you again! 🌟"
    ],
    ar: [
      "أهلاً بعودتك، المبرمج الصغير! 🚀",
      "مستعد لمزيد من مغامرات البرمجة؟ ✨",
      "لنواصل رحلة البرمجة! 🎮",
      "سعيد برؤيتك مرة أخرى! 🌟"
    ]
  };
  
  const roles = [
    { 
      value: 'Kid', 
      label: language === 'en' ? 'Kid' : 'طفل',
      icon: <FaChild />,
      color: '#4ecdc4',
      description: language === 'en' ? 'Ready to learn and code!' : 'مستعد للتعلم والبرمجة!'
    },
    { 
      value: 'Parent', 
      label: language === 'en' ? 'Parent' : 'والد',
      icon: <FaUsers />,
      color: '#ff6b6b',
      description: language === 'en' ? 'Track your child\'s progress' : 'تابع تقدم طفلك'
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMascotMessage(prev => 
        (prev + 1) % mascotMessages[language].length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = language === 'en' ? 'Please enter your email or username' : 'يرجى إدخال البريد الإلكتروني أو اسم المستخدم';
    } else if (formData.email.includes('@') && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صحيح';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'en' ? 'Please enter your password' : 'يرجى إدخال كلمة المرور';
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'en' ? 'Password must be at least 6 characters' : 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      playSound && playSound('error');
      return;
    }
  
    setIsLoading(true);
    setLoginError(null);
    playSound && playSound('click');
  
    try {
      const response = await axiosInstance.post('accounts/login/', {
        email: formData.email,
        password: formData.password
      });
  
      if (response.data.message === 'Login successful') {
        const { user, tokens } = response.data;

        login(
          {
            id: user.id,
            username: user.username || user.email,
            role: user.role,
          },
          tokens.access,
          formData.rememberMe,
          tokens.refresh
        );
        playSound && playSound('success');
  
        switch (user.role) {
          case "Kid":
            navigate("/");
            break;
          case "Parent":
            navigate("/parent-dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      playSound && playSound('error');
      if (error.response?.data) {
        const errorMsg = error.response.data.message || error.response.data.detail;
        setLoginError(language === 'en'
          ? errorMsg || 'invalid email or password. Try again!'
          : errorMsg || ' البريد الإلكتروني أو كلمة المرور خاطئة. حاول مرة أخرى!'
        );
      } else {
        setLoginError(language === 'en'
          ? 'Something went wrong. Please try again!'
          : 'حدث خطأ ما. يرجى المحاولة مرة أخرى!'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    playSound && playSound('hover');
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setShowRoleSelection(false);
    playSound && playSound('success');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    playSound && playSound('click');
    
    try {
      // For now, show a message that Google login is coming soon
      // In production, this would integrate with Google OAuth
      alert(language === 'en' 
        ? 'Google login coming soon! 🚀' 
        : 'تسجيل الدخول بجوجل قريباً! 🚀'
      );
      
      // TODO: Implement actual Google OAuth integration
      // window.location.href = '/auth/google';
      
    } catch (error) {
      console.error('Google login error:', error);
      playSound && playSound('error');
      setLoginError(
        language === 'en' 
          ? 'Google login failed. Please try again!' 
          : 'فشل تسجيل الدخول بجوجل. يرجى المحاولة مرة أخرى!'
      );
    } finally {
      setIsLoading(false);
    }
  };


  const RoleSelectionScreen = () => (
    <div className="role-selection-container">
      <div className="role-selection-header">
        <div className="welcome-title">
          <FaRobot className="logo-icon" />
          <h1>{language === 'en' ? 'Welcome to Code4Kids!' : 'أهلاً بك في Code4Kids!'}</h1>
        </div>
        <p>{language === 'en' ? 'Please select your role to continue' : 'يرجى اختيار دورك للمتابعة'}</p>
      </div>
      <div className="role-cards-grid">
        {roles.map((role) => (
          <div 
            key={role.value}
            className="role-card"
            style={{ '--role-color': role.color }}
            onClick={() => handleRoleSelect(role.value)}
          >
            <div className="role-icon">
              {role.icon}
            </div>
            <h3>{role.label}</h3>
            <p>{role.description}</p>
            <div className="role-select-btn">
              {language === 'en' ? 'Select' : 'اختيار'}
            </div>
          </div>
        ))}
      </div>
      <button 
        className="back-btn"
        onClick={() => navigate('/')}
      >
        {language === 'en' ? '← Back to Home' : '← العودة للرئيسية'}
      </button>
    </div>
  );

  return (
    <div className={`minimal-login-page ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="login-container">
        {showRoleSelection ? (
          <RoleSelectionScreen />
        ) : (
          <div className="login-form-container">
            <div className="login-header">
              <h1>{language === 'en' ? 'Login' : 'تسجيل الدخول'}</h1>
              <div className="selected-role">
                <span className="role-badge" style={{ backgroundColor: roles.find(r => r.value === formData.role)?.color }}>
                  {roles.find(r => r.value === formData.role)?.icon}
                  {roles.find(r => r.value === formData.role)?.label}
                </span>
                <button 
                  className="change-role-btn"
                  onClick={() => setShowRoleSelection(true)}
                >
                  {language === 'en' ? 'Change' : 'تغيير'}
                </button>
              </div>
            </div>


          {loginError && (
            <div className="error-alert">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                className={`login-form-input ${errors.email ? 'error' : ''}`}
                placeholder={language === 'en' ? 'Email or Username' : 'البريد الإلكتروني أو اسم المستخدم'}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="login-form-group">
              <div className="password-input-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`login-form-input ${errors.password ? 'error' : ''}`}
                  placeholder={language === 'en' ? 'Password' : 'كلمة المرور'}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="remember-me-container">
              <label className="remember-me-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="remember-me-checkbox"
                />
                <span className="checkmark"></span>
                <span className="remember-me-text">
                  {language === 'en' ? 'Remember me' : 'تذكرني'}
                </span>
              </label>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (language === 'en' ? 'Logging in...' : 'جاري تسجيل الدخول...') : (language === 'en' ? 'Login' : 'دخول')}
            </button>

            <div className="divider">
              <span>{language === 'en' ? 'OR' : 'أو'}</span>
            </div>

            <button 
              type="button" 
              className="google-login-button" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FcGoogle className="google-icon" />
              <span>{language === 'en' ? 'Continue with Google' : 'المتابعة بجوجل'}</span>
            </button>

            <div className="form-links">
              <Link to="/register" className="register-link">
                {language === 'en' ? "Don't have an account? Sign up" : 'ليس لديك حساب؟ سجل هنا'}
              </Link>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Login);