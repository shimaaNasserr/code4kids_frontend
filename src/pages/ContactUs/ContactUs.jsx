import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeadset,
  FaRocket,
  FaHeart
} from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './ContactUs.css';

const ContactUs = () => {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: language === 'en' ? 'Email Us' : 'راسلنا',
      value: 'support@code4kids.com',
      description: language === 'en' ? 'We reply within 24 hours' : 'نرد خلال 24 ساعة',
      color: '#FF6B9D'
    },
    {
      icon: <FaPhone />,
      title: language === 'en' ? 'Call Us' : 'اتصل بنا',
      value: '+1 (555) 123-4567',
      description: language === 'en' ? 'Mon-Fri, 9AM-6PM EST' : 'الإثنين-الجمعة، 9ص-6م',
      color: '#4ECDC4'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: language === 'en' ? 'Visit Us' : 'زرنا',
      value: language === 'en' ? '123 Learning Street, Education City' : '123 شارع التعلم، مدينة التعليم',
      description: language === 'en' ? 'Silicon Valley, CA 94000' : 'وادي السيليكون، كاليفورنيا 94000',
      color: '#FFD93D'
    },
    {
      icon: <FaClock />,
      title: language === 'en' ? 'Support Hours' : 'ساعات الدعم',
      value: language === 'en' ? '24/7 Online Support' : 'دعم متاح 24/7',
      description: language === 'en' ? 'Always here to help!' : 'دائماً هنا للمساعدة!',
      color: '#A8E6CF'
    }
  ];


  return (
    <div className={`contact-us ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-hero-content">
          <motion.div
            className="contact-hero-icon"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaHeadset />
          </motion.div>
          <h1>{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</h1>
          <p>
            {language === 'en' 
              ? 'Have questions? We\'d love to hear from you! Our friendly team is here to help make your coding journey amazing.'
              : 'لديك أسئلة؟ نحب أن نسمع منك! فريقنا الودود هنا لمساعدتك في جعل رحلة البرمجة رائعة.'}
          </p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section 
        className="contact-info-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-info-card"
                style={{ '--info-color': info.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 20px 40px ${info.color}30`
                }}
              >
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="info-value">{info.value}</p>
                <p className="info-description">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        className="contact-form-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="form-container">
            <div className="form-header">
              <h2>{language === 'en' ? 'Send us a Message' : 'أرسل لنا رسالة'}</h2>
              <p>
                {language === 'en'
                  ? 'Fill out the form below and we\'ll get back to you as soon as possible!'
                  : 'املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن!'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser />
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope />
                  {language === 'en' ? 'Email Address' : 'عنوان البريد الإلكتروني'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={language === 'en' ? 'Enter your email address' : 'أدخل عنوان بريدك الإلكتروني'}
                  required
                />
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject">
                  {language === 'en' ? 'Subject' : 'الموضوع'}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={language === 'en' ? 'What is your message about?' : 'ما موضوع رسالتك؟'}
                  required
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">
                  {language === 'en' ? 'Message' : 'الرسالة'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={language === 'en' ? 'Tell us more about your question or feedback...' : 'أخبرنا المزيد عن سؤالك أو ملاحظاتك...'}
                  rows="6"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05, y: -3 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <FaPaperPlane />
                )}
                <span>
                  {isSubmitting
                    ? (language === 'en' ? 'Sending...' : 'جاري الإرسال...')
                    : (language === 'en' ? 'Send Message' : 'إرسال الرسالة')}
                </span>
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="status-message success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaCheckCircle />
                    <span>
                      {language === 'en'
                        ? 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!'
                        : 'شكراً لك! تم إرسال رسالتك بنجاح. سنعاود الاتصال بك قريباً!'}
                    </span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    className="status-message error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaExclamationTriangle />
                    <span>
                      {language === 'en'
                        ? 'Oops! Something went wrong. Please try again or contact us directly.'
                        : 'عذراً! حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Additional Support Section */}
      <motion.section 
        className="additional-support"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="support-content">
            <div className="support-info">
              <h2>{language === 'en' ? 'Need Immediate Help?' : 'تحتاج مساعدة فورية؟'}</h2>
              <p>
                {language === 'en'
                  ? 'Check out our Help Center and FAQ for quick answers to common questions. You can also browse our video tutorials and guides.'
                  : 'تحقق من مركز المساعدة والأسئلة الشائعة للحصول على إجابات سريعة للأسئلة الشائعة. يمكنك أيضاً تصفح دروس الفيديو والأدلة.'}
              </p>
              <div className="support-stats">
                <div className="stat-item">
                  <FaRocket />
                  <div>
                    <span className="stat-number">24h</span>
                    <span className="stat-label">{language === 'en' ? 'Response Time' : 'وقت الاستجابة'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaHeart />
                  <div>
                    <span className="stat-number">99%</span>
                    <span className="stat-label">{language === 'en' ? 'Happy Families' : 'عائلات سعيدة'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="support-actions">
              <motion.a
                href="/help-center"
                className="support-btn primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Visit Help Center' : 'زيارة مركز المساعدة'}
              </motion.a>
              <motion.a
                href="/faq"
                className="support-btn secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Browse FAQ' : 'تصفح الأسئلة الشائعة'}
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
