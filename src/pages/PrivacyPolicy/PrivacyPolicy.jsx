import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookie, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const sections = [
    {
      id: 'information-collection',
      title: language === 'en' ? 'Information We Collect' : 'المعلومات التي نجمعها',
      icon: <FaDatabase />,
      content: language === 'en' 
        ? 'We collect information you provide directly to us, such as when you create an account, participate in our coding activities, or contact us for support. This may include your name, email address, age (for parental consent), and learning progress data.'
        : 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل عند إنشاء حساب أو المشاركة في أنشطة البرمجة أو الاتصال بنا للحصول على الدعم. قد يشمل ذلك اسمك وعنوان بريدك الإلكتروني وعمرك (للحصول على موافقة الوالدين) وبيانات تقدم التعلم.'
    },
    {
      id: 'information-use',
      title: language === 'en' ? 'How We Use Your Information' : 'كيف نستخدم معلوماتك',
      icon: <FaUserShield />,
      content: language === 'en'
        ? 'We use the information we collect to provide, maintain, and improve our services, personalize your learning experience, communicate with you about your account and our services, and ensure the safety and security of our platform.'
        : 'نستخدم المعلومات التي نجمعها لتوفير خدماتنا وصيانتها وتحسينها، وتخصيص تجربة التعلم الخاصة بك، والتواصل معك حول حسابك وخدماتنا، وضمان سلامة وأمان منصتنا.'
    },
    {
      id: 'information-sharing',
      title: language === 'en' ? 'Information Sharing' : 'مشاركة المعلومات',
      icon: <FaLock />,
      content: language === 'en'
        ? 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted service providers who assist us in operating our platform, conducting our business, or serving our users.'
        : 'لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف ثالثة دون موافقتك، باستثناء ما هو موضح في هذه السياسة. قد نشارك المعلومات مع مقدمي الخدمات الموثوقين الذين يساعدوننا في تشغيل منصتنا أو إدارة أعمالنا أو خدمة مستخدمينا.'
    },
    {
      id: 'data-security',
      title: language === 'en' ? 'Data Security' : 'أمان البيانات',
      icon: <FaShieldAlt />,
      content: language === 'en'
        ? 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.'
        : 'نطبق التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%.'
    },
    {
      id: 'childrens-privacy',
      title: language === 'en' ? "Children's Privacy" : 'خصوصية الأطفال',
      icon: <FaUserShield />,
      content: language === 'en'
        ? 'Code4Kids is designed for children and we take their privacy seriously. We comply with applicable children\'s privacy laws and require parental consent for children under 13. We do not knowingly collect personal information from children without proper consent.'
        : 'تم تصميم Code4Kids للأطفال ونحن نأخذ خصوصيتهم على محمل الجد. نحن نلتزم بقوانين خصوصية الأطفال المعمول بها ونتطلب موافقة الوالدين للأطفال دون سن 13 عامًا. لا نجمع عن علم معلومات شخصية من الأطفال دون الحصول على الموافقة المناسبة.'
    },
    {
      id: 'cookies',
      title: language === 'en' ? 'Cookies and Tracking' : 'ملفات تعريف الارتباط والتتبع',
      icon: <FaCookie />,
      content: language === 'en'
        ? 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences. For more details, please see our Cookie Policy.'
        : 'نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك وتحليل أنماط الاستخدام وتحسين خدماتنا. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح. لمزيد من التفاصيل، يرجى الاطلاع على سياسة ملفات تعريف الارتباط.'
    },
    {
      id: 'contact',
      title: language === 'en' ? 'Contact Us' : 'اتصل بنا',
      icon: <FaEnvelope />,
      content: language === 'en'
        ? 'If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@code4kids.com or through our contact form. We will respond to your inquiry within a reasonable timeframe.'
        : 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات الخصوصية لدينا، يرجى الاتصال بنا على privacy@code4kids.com أو من خلال نموذج الاتصال الخاص بنا. سنرد على استفسارك في إطار زمني معقول.'
    }
  ];

  return (
    <div className={`privacy-policy ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="privacy-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="privacy-hero-content">
          <motion.div
            className="privacy-hero-icon"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaShieldAlt />
          </motion.div>
          <h1>{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</h1>
          <p>
            {language === 'en'
              ? 'Your privacy is important to us. Learn how we collect, use, and protect your information.'
              : 'خصوصيتك مهمة بالنسبة لنا. تعرف على كيفية جمع واستخدام وحماية معلوماتك.'}
          </p>
          <div className="last-updated">
            {language === 'en' ? 'Last updated: January 2025' : 'آخر تحديث: يناير 2025'}
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <section className="privacy-content">
        <div className="section-container">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="privacy-section"
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
        className="privacy-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="section-container">
          <div className="cta-content">
            <h2>{language === 'en' ? 'Questions About Privacy?' : 'أسئلة حول الخصوصية؟'}</h2>
            <p>
              {language === 'en'
                ? 'We\'re here to help. Contact us if you have any questions about our privacy practices.'
                : 'نحن هنا للمساعدة. اتصل بنا إذا كان لديك أي أسئلة حول ممارسات الخصوصية لدينا.'}
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

export default PrivacyPolicy;
