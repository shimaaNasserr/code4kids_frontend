import React from 'react';
import { motion } from 'framer-motion';
import { FaCookie, FaCog, FaChartBar, FaUserShield, FaToggleOn, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './CookiePolicy.css';

const CookiePolicy = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const sections = [
    {
      id: 'what-are-cookies',
      title: language === 'en' ? 'What Are Cookies?' : 'ما هي ملفات تعريف الارتباط؟',
      icon: <FaCookie />,
      content: language === 'en' 
        ? 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.'
        : 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهاز الكمبيوتر أو الجهاز المحمول عند زيارة موقعنا. إنها تساعدنا في تقديم تجربة أفضل لك من خلال تذكر تفضيلاتك وتحسين خدماتنا.'
    },
    {
      id: 'types-of-cookies',
      title: language === 'en' ? 'Types of Cookies We Use' : 'أنواع ملفات تعريف الارتباط التي نستخدمها',
      icon: <FaCog />,
      content: language === 'en'
        ? 'We use essential cookies for basic website functionality, performance cookies to analyze how you use our site, functional cookies to remember your preferences, and targeting cookies to provide relevant content and advertisements.'
        : 'نستخدم ملفات تعريف الارتباط الأساسية لوظائف الموقع الأساسية، وملفات تعريف الارتباط الخاصة بالأداء لتحليل كيفية استخدامك لموقعنا، وملفات تعريف الارتباط الوظيفية لتذكر تفضيلاتك، وملفات تعريف الارتباط المستهدفة لتقديم محتوى وإعلانات ذات صلة.'
    },
    {
      id: 'essential-cookies',
      title: language === 'en' ? 'Essential Cookies' : 'ملفات تعريف الارتباط الأساسية',
      icon: <FaUserShield />,
      content: language === 'en'
        ? 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your login status. The website cannot function properly without these cookies.'
        : 'هذه الملفات ضرورية لعمل الموقع بشكل صحيح. إنها تمكن الوظائف الأساسية مثل التنقل في الصفحة والوصول إلى المناطق الآمنة وتذكر حالة تسجيل الدخول. لا يمكن للموقع العمل بشكل صحيح بدون هذه الملفات.'
    },
    {
      id: 'analytics-cookies',
      title: language === 'en' ? 'Analytics Cookies' : 'ملفات تعريف الارتباط التحليلية',
      icon: <FaChartBar />,
      content: language === 'en'
        ? 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and provide better content for our users.'
        : 'تساعدنا هذه الملفات في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول. هذا يساعدنا في تحسين موقعنا وتقديم محتوى أفضل لمستخدمينا.'
    },
    {
      id: 'functional-cookies',
      title: language === 'en' ? 'Functional Cookies' : 'ملفات تعريف الارتباط الوظيفية',
      icon: <FaToggleOn />,
      content: language === 'en'
        ? 'These cookies enable enhanced functionality and personalization, such as remembering your language preference, theme settings, and other customizations to provide you with a more personalized experience.'
        : 'تمكن هذه الملفات من تحسين الوظائف والتخصيص، مثل تذكر تفضيل اللغة وإعدادات السمة والتخصيصات الأخرى لتوفير تجربة أكثر تخصيصًا لك.'
    },
    {
      id: 'managing-cookies',
      title: language === 'en' ? 'Managing Your Cookies' : 'إدارة ملفات تعريف الارتباط الخاصة بك',
      icon: <FaCog />,
      content: language === 'en'
        ? 'You can control and manage cookies in various ways. Most web browsers allow you to control cookies through their settings preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent.'
        : 'يمكنك التحكم في ملفات تعريف الارتباط وإدارتها بطرق مختلفة. تسمح لك معظم متصفحات الويب بالتحكم في ملفات تعريف الارتباط من خلال تفضيلات الإعدادات. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط أو تنبيهك عند إرسالها.'
    },
    {
      id: 'third-party-cookies',
      title: language === 'en' ? 'Third-Party Cookies' : 'ملفات تعريف الارتباط من طرف ثالث',
      icon: <FaInfoCircle />,
      content: language === 'en'
        ? 'We may use third-party services that place cookies on your device. These services help us analyze website traffic, provide social media features, and deliver relevant advertisements. Each third-party service has its own privacy policy.'
        : 'قد نستخدم خدمات طرف ثالث تضع ملفات تعريف الارتباط على جهازك. تساعدنا هذه الخدمات في تحليل حركة مرور الموقع وتوفير ميزات وسائل التواصل الاجتماعي وتقديم إعلانات ذات صلة. كل خدمة طرف ثالث لها سياسة خصوصية خاصة بها.'
    },
    {
      id: 'contact',
      title: language === 'en' ? 'Questions About Cookies?' : 'أسئلة حول ملفات تعريف الارتباط؟',
      icon: <FaEnvelope />,
      content: language === 'en'
        ? 'If you have any questions about our use of cookies or this Cookie Policy, please contact us at cookies@code4kids.com or through our contact form. We\'re happy to help clarify our cookie practices.'
        : 'إذا كان لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط أو سياسة ملفات تعريف الارتباط هذه، يرجى الاتصال بنا على cookies@code4kids.com أو من خلال نموذج الاتصال الخاص بنا. نحن سعداء لمساعدتك في توضيح ممارسات ملفات تعريف الارتباط لدينا.'
    }
  ];

  return (
    <div className={`cookie-policy ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="cookie-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="cookie-hero-content">
          <motion.div
            className="cookie-hero-icon"
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
            <FaCookie />
          </motion.div>
          <h1>{language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط'}</h1>
          <p>
            {language === 'en'
              ? 'Learn about how we use cookies to improve your experience on Code4Kids.'
              : 'تعرف على كيفية استخدامنا لملفات تعريف الارتباط لتحسين تجربتك على Code4Kids.'}
          </p>
          <div className="last-updated">
            {language === 'en' ? 'Last updated: January 2025' : 'آخر تحديث: يناير 2025'}
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <section className="cookie-content">
        <div className="section-container">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="cookie-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="section-header">
                <div className="section-icon">{section.icon}</div>
                <h2>{section.title}</h2>
              </div>
              <div className="section-content">
                <p>{section.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <motion.section 
        className="cookie-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="section-container">
          <div className="cta-content">
            <h2>{language === 'en' ? 'Cookie Preferences' : 'تفضيلات ملفات تعريف الارتباط'}</h2>
            <p>
              {language === 'en'
                ? 'Want to manage your cookie settings or have questions? Contact us for assistance.'
                : 'تريد إدارة إعدادات ملفات تعريف الارتباط أو لديك أسئلة؟ اتصل بنا للحصول على المساعدة.'}
            </p>
            <motion.a
              href="/contact-us"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CookiePolicy;
