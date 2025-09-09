import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaRocket, FaGamepad, FaTrophy, FaRobot, FaStar, FaHeart, FaCode, FaPuzzlePiece, FaUsers, FaGift, FaSpinner, FaExclamationTriangle, FaChild, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './Footer.css';


export const Footer = () => {


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
  return (
    <>
    <footer className="footer-section">
<div className="footer-container">
  <div className="footer-content">
    {/* Main Footer Info */}
    <div className="footer-main">
      <div className="footer-brand">
        <div className="footer-logo">
          <FaRobot className="logo-icon" />
          <h3>{language === 'en' ? 'Code4Kids' : 'كود للأطفال'}</h3>
        </div>
        <p className="footer-description">
          {language === 'en' 
            ? 'Making programming fun and accessible for every child aged 7-14. Learn coding through games, interactive lessons, and AI assistance.'
            : 'نجعل البرمجة ممتعة ومتاحة لكل طفل من عمر 7-14. تعلم البرمجة من خلال الألعاب والدروس التفاعلية والمساعدة الذكية.'}
        </p>
        <div className="footer-social">
          <a href="#" className="social-link" aria-label="Facebook">
            <FaUsers />
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <FaStar />
          </a>
          <a href="#" className="social-link" aria-label="Instagram">
            <FaHeart />
          </a>
          <a href="#" className="social-link" aria-label="YouTube">
            <FaGamepad />
          </a>
        </div>
      </div>
    </div>

    {/* Quick Links */}
    <div className="footer-links">
      <div className="footer-column">
        <h4>{language === 'en' ? 'Learning' : 'التعلم'}</h4>
        <ul>
          <li><Link to="/courses">{language === 'en' ? 'Courses' : 'الدورات'}</Link></li>
          <li><Link to="/lessons">{language === 'en' ? 'Lessons' : 'الدروس'}</Link></li>
          <li><Link to="/games">{language === 'en' ? 'Games' : 'الألعاب'}</Link></li>
          <li><Link to="/challenges">{language === 'en' ? 'Challenges' : 'التحديات'}</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>{language === 'en' ? 'Support' : 'الدعم'}</h4>
        <ul>
          <li><Link to="/help-center">{language === 'en' ? 'Help Center' : 'مركز المساعدة'}</Link></li>
          <li><Link to="/faq">{language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</Link></li>
          <li><Link to="/contact-us">{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</Link></li>
          <li><Link to="/chatbot">{language === 'en' ? 'AI Chatbot' : 'المحادثة الذكية'}</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>{language === 'en' ? 'Parents' : 'الوالدين'}</h4>
        <ul>
          <li><Link to="/parent-dashboard">{language === 'en' ? 'Dashboard' : 'لوحة التحكم'}</Link></li>
          <li><Link to="/progress-tracking">{language === 'en' ? 'Progress Tracking' : 'تتبع التقدم'}</Link></li>
          <li><Link to="/reports">{language === 'en' ? 'Reports' : 'التقارير'}</Link></li>
          <li><Link to="/parent-guide">{language === 'en' ? 'Parent Guide' : 'دليل الوالدين'}</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>{language === 'en' ? 'Platform' : 'المنصة'}</h4>
        <ul>
          <li><Link to="/about-us">{language === 'en' ? 'About Us' : 'من نحن'}</Link></li>
          <li><Link to="/our-team">{language === 'en' ? 'Our Team' : 'فريقنا'}</Link></li>
        </ul>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="footer-bottom">
    <div className="footer-bottom-content">
      <div className="footer-legal">
        <p>&copy; 2025 Code4Kids. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
        <div className="legal-links">
          <Link to="/privacy-policy">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>
          <Link to="/terms-of-service">{language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</Link>
          <Link to="/cookie-policy">{language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط'}</Link>
        </div>
      </div>
      <div className="footer-newsletter">
        <h5>{language === 'en' ? 'Stay Updated!' : 'ابق محدثاً!'}</h5>
        <p>{language === 'en' ? 'Get the latest coding tips and updates' : 'احصل على أحدث نصائح البرمجة والتحديثات'}</p>
        <div className="newsletter-form">
          <input 
            type="email" 
            placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
            className="newsletter-input"
          />
          <button className="newsletter-btn">
            <FaRocket />
            {language === 'en' ? 'Subscribe' : 'اشترك'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</footer>
    </>
  )
}




