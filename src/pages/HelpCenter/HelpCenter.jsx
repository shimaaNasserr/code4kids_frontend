import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaBook, 
  FaHeadset, 
  FaFileAlt, 
  FaRocket,
  FaGamepad,
  FaTrophy,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaLightbulb
} from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './HelpCenter.css';

const HelpCenter = () => {
  const { language, isRTL } = useLanguage();

  const helpSections = [
    {
      id: 'getting-started',
      title: language === 'en' ? 'Getting Started' : 'البدء',
      description: language === 'en' ? 'Learn the basics of Code4Kids platform' : 'تعلم أساسيات منصة Code4Kids',
      icon: <FaRocket />,
      color: '#FF6B9D',
      items: [
        {
          title: language === 'en' ? 'How to Create an Account' : 'كيفية إنشاء حساب',
          description: language === 'en' ? 'Step-by-step guide to register on Code4Kids' : 'دليل خطوة بخطوة للتسجيل في Code4Kids'
        },
        {
          title: language === 'en' ? 'Choosing Your Learning Path' : 'اختيار مسار التعلم',
          description: language === 'en' ? 'Find the right coding adventure for your skill level' : 'اعثر على مغامرة البرمجة المناسبة لمستوى مهارتك'
        },
        {
          title: language === 'en' ? 'Navigating the Platform' : 'التنقل في المنصة',
          description: language === 'en' ? 'Learn how to use all the features and tools' : 'تعلم كيفية استخدام جميع الميزات والأدوات'
        }
      ]
    },
    {
      id: 'learning-resources',
      title: language === 'en' ? 'Learning Resources' : 'موارد التعلم',
      description: language === 'en' ? 'Explore our educational materials and tools' : 'استكشف موادنا التعليمية والأدوات',
      icon: <FaBook />,
      color: '#4ECDC4',
      items: [
        {
          title: language === 'en' ? 'Interactive Lessons' : 'الدروس التفاعلية',
          description: language === 'en' ? 'Hands-on coding lessons with drag-and-drop blocks' : 'دروس برمجة عملية مع كتل السحب والإفلات'
        },
        {
          title: language === 'en' ? 'Video Tutorials' : 'دروس الفيديو',
          description: language === 'en' ? 'Watch step-by-step coding tutorials' : 'شاهد دروس البرمجة خطوة بخطوة'
        },
        {
          title: language === 'en' ? 'Practice Games' : 'ألعاب التدريب',
          description: language === 'en' ? 'Fun games to reinforce your coding skills' : 'ألعاب ممتعة لتعزيز مهارات البرمجة'
        }
      ]
    },
    {
      id: 'parent-teacher',
      title: language === 'en' ? 'For Parents & Teachers' : 'للوالدين والمعلمين',
      description: language === 'en' ? 'Tools and guides for supervising young coders' : 'أدوات وأدلة للإشراف على المبرمجين الصغار',
      icon: <FaUsers />,
      color: '#FFD93D',
      items: [
        {
          title: language === 'en' ? 'Progress Tracking' : 'تتبع التقدم',
          description: language === 'en' ? 'Monitor your child\'s learning progress and achievements' : 'راقب تقدم طفلك التعليمي وإنجازاته'
        },
        {
          title: language === 'en' ? 'Setting Learning Goals' : 'وضع أهداف التعلم',
          description: language === 'en' ? 'Help set appropriate learning targets and milestones' : 'ساعد في وضع أهداف ومعالم تعليمية مناسبة'
        },
        {
          title: language === 'en' ? 'Safety Guidelines' : 'إرشادات الأمان',
          description: language === 'en' ? 'Keep your child safe while learning online' : 'حافظ على سلامة طفلك أثناء التعلم عبر الإنترنت'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: language === 'en' ? 'Troubleshooting' : 'حل المشاكل',
      description: language === 'en' ? 'Solutions to common technical issues' : 'حلول للمشاكل التقنية الشائعة',
      icon: <FaLightbulb />,
      color: '#A8E6CF',
      items: [
        {
          title: language === 'en' ? 'Login Problems' : 'مشاكل تسجيل الدخول',
          description: language === 'en' ? 'Can\'t access your account? Here\'s how to fix it' : 'لا يمكنك الوصول إلى حسابك؟ إليك كيفية إصلاحه'
        },
        {
          title: language === 'en' ? 'Browser Compatibility' : 'توافق المتصفح',
          description: language === 'en' ? 'Ensure your browser works perfectly with Code4Kids' : 'تأكد من أن متصفحك يعمل بشكل مثالي مع Code4Kids'
        },
        {
          title: language === 'en' ? 'Audio/Video Issues' : 'مشاكل الصوت/الفيديو',
          description: language === 'en' ? 'Fix sound and video problems in lessons' : 'إصلاح مشاكل الصوت والفيديو في الدروس'
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: language === 'en' ? 'Contact Support' : 'اتصل بالدعم',
      description: language === 'en' ? 'Get help from our friendly team' : 'احصل على المساعدة من فريقنا الودود',
      icon: <FaHeadset />,
      color: '#FF6B9D',
      link: '/contact-us'
    },
    {
      title: language === 'en' ? 'FAQ' : 'الأسئلة الشائعة',
      description: language === 'en' ? 'Find answers to common questions' : 'اعثر على إجابات للأسئلة الشائعة',
      icon: <FaQuestionCircle />,
      color: '#4ECDC4',
      link: '/faq'
    }
  ];

  return (
    <div className={`help-center ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="help-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="help-hero-content">
          <motion.div
            className="help-hero-icon"
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
            <FaGraduationCap />
          </motion.div>
          <h1>{language === 'en' ? 'Help Center' : 'مركز المساعدة'}</h1>
          <p>
            {language === 'en' 
              ? 'Welcome to the Code4Kids Help Center! Find everything you need to make your coding journey amazing.'
              : 'مرحباً بك في مركز مساعدة Code4Kids! اعثر على كل ما تحتاجه لجعل رحلة البرمجة رائعة.'}
          </p>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        className="quick-actions"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <h2>{language === 'en' ? 'Need Quick Help?' : 'تحتاج مساعدة سريعة؟'}</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                className="quick-action-card"
                style={{ '--action-color': action.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 20px 40px ${action.color}30`
                }}
              >
                <Link to={action.link} className="action-link">
                  <div className="action-icon">{action.icon}</div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Help Sections */}
      <motion.section 
        className="help-sections"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <h2>{language === 'en' ? 'Browse Help Topics' : 'تصفح مواضيع المساعدة'}</h2>
          <div className="help-sections-grid">
            {helpSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="help-section-card"
                style={{ '--section-color': section.color }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="section-header">
                  <div className="section-icon">{section.icon}</div>
                  <div className="section-info">
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                </div>
                <div className="section-items">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="section-item"
                      whileHover={{ x: isRTL ? -10 : 10, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="help-contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>{language === 'en' ? 'Still Need Help?' : 'ما زلت تحتاج مساعدة؟'}</h2>
              <p>
                {language === 'en'
                  ? 'Our friendly support team is here to help you with any questions or issues you might have.'
                  : 'فريق الدعم الودود لدينا هنا لمساعدتك في أي أسئلة أو مشاكل قد تواجهها.'}
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <FaEnvelope />
                  <span>support@code4kids.com</span>
                </div>
                <div className="contact-method">
                  <FaPhone />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <Link to="/contact-us" className="contact-btn primary">
                <FaHeadset />
                {language === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
              </Link>
              <Link to="/faq" className="contact-btn secondary">
                <FaQuestionCircle />
                {language === 'en' ? 'View FAQ' : 'عرض الأسئلة الشائعة'}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HelpCenter;
