import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaUsers, FaExclamationTriangle, FaGavel, FaUserCheck, FaShieldAlt, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './TermsOfService.css';

const TermsOfService = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const sections = [
    {
      id: 'acceptance',
      title: language === 'en' ? 'Acceptance of Terms' : 'قبول الشروط',
      icon: <FaFileContract />,
      content: language === 'en' 
        ? 'By accessing and using Code4Kids, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        : 'من خلال الوصول إلى Code4Kids واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة.'
    },
    {
      id: 'user-accounts',
      title: language === 'en' ? 'User Accounts' : 'حسابات المستخدمين',
      icon: <FaUserCheck />,
      content: language === 'en'
        ? 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.'
        : 'عند إنشاء حساب معنا، يجب عليك تقديم معلومات دقيقة وكاملة وحديثة في جميع الأوقات. أنت مسؤول عن حماية كلمة المرور وعن جميع الأنشطة التي تحدث تحت حسابك.'
    },
    {
      id: 'acceptable-use',
      title: language === 'en' ? 'Acceptable Use' : 'الاستخدام المقبول',
      icon: <FaUsers />,
      content: language === 'en'
        ? 'You may use our service for lawful purposes only. You agree not to use the service to transmit, distribute, store or destroy material that could constitute or encourage conduct that would be considered a criminal offense, violate the rights of any party, or otherwise violate any local, state, national or international law.'
        : 'يجوز لك استخدام خدمتنا للأغراض القانونية فقط. توافق على عدم استخدام الخدمة لنقل أو توزيع أو تخزين أو تدمير مواد قد تشكل أو تشجع سلوكًا يعتبر جريمة جنائية، أو ينتهك حقوق أي طرف، أو ينتهك أي قانون محلي أو إقليمي أو وطني أو دولي.'
    },
    {
      id: 'intellectual-property',
      title: language === 'en' ? 'Intellectual Property' : 'الملكية الفكرية',
      icon: <FaShieldAlt />,
      content: language === 'en'
        ? 'The service and its original content, features and functionality are and will remain the exclusive property of Code4Kids and its licensors. The service is protected by copyright, trademark, and other laws.'
        : 'الخدمة ومحتواها الأصلي وميزاتها ووظائفها هي وستبقى الملكية الحصرية لـ Code4Kids ومرخصيها. الخدمة محمية بحقوق الطبع والنشر والعلامات التجارية والقوانين الأخرى.'
    },
    {
      id: 'prohibited-uses',
      title: language === 'en' ? 'Prohibited Uses' : 'الاستخدامات المحظورة',
      icon: <FaExclamationTriangle />,
      content: language === 'en'
        ? 'You may not use our service to engage in any activity that interferes with or disrupts the service, to impersonate or attempt to impersonate another user, to upload viruses or other malicious code, or to engage in any other conduct that restricts or inhibits anyone\'s use or enjoyment of the service.'
        : 'لا يجوز لك استخدام خدمتنا للمشاركة في أي نشاط يتداخل مع الخدمة أو يعطلها، أو انتحال شخصية مستخدم آخر أو محاولة انتحال شخصيته، أو تحميل فيروسات أو رموز ضارة أخرى، أو المشاركة في أي سلوك آخر يقيد أو يمنع استخدام أي شخص للخدمة أو الاستمتاع بها.'
    },
    {
      id: 'termination',
      title: language === 'en' ? 'Termination' : 'الإنهاء',
      icon: <FaGavel />,
      content: language === 'en'
        ? 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.'
        : 'يجوز لنا إنهاء أو تعليق حسابك ومنع الوصول إلى الخدمة فورًا، دون إشعار مسبق أو مسؤولية، وفقًا لتقديرنا الوحيد، لأي سبب كان ودون قيود، بما في ذلك على سبيل المثال لا الحصر انتهاك الشروط.'
    },
    {
      id: 'disclaimer',
      title: language === 'en' ? 'Disclaimer' : 'إخلاء المسؤولية',
      icon: <FaExclamationTriangle />,
      content: language === 'en'
        ? 'The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied.'
        : 'يتم تقديم المعلومات على هذا الموقع على أساس "كما هي". إلى أقصى حد يسمح به القانون، تستبعد هذه الشركة جميع التمثيلات والضمانات والشروط والأحكام سواء كانت صريحة أو ضمنية.'
    },
    {
      id: 'contact',
      title: language === 'en' ? 'Contact Information' : 'معلومات الاتصال',
      icon: <FaEnvelope />,
      content: language === 'en'
        ? 'If you have any questions about these Terms of Service, please contact us at legal@code4kids.com or through our contact form. We will address your concerns promptly.'
        : 'إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا على legal@code4kids.com أو من خلال نموذج الاتصال الخاص بنا. سنتعامل مع مخاوفك بسرعة.'
    }
  ];

  return (
    <div className={`terms-service ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="terms-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="terms-hero-content">
          <motion.div
            className="terms-hero-icon"
            animate={{ 
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaFileContract />
          </motion.div>
          <h1>{language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</h1>
          <p>
            {language === 'en'
              ? 'Please read these terms carefully before using our platform. They govern your use of Code4Kids.'
              : 'يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا. إنها تحكم استخدامك لـ Code4Kids.'}
          </p>
          <div className="last-updated">
            {language === 'en' ? 'Last updated: January 2025' : 'آخر تحديث: يناير 2025'}
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <section className="terms-content">
        <div className="section-container">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="terms-section"
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
        className="terms-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="section-container">
          <div className="cta-content">
            <h2>{language === 'en' ? 'Questions About Our Terms?' : 'أسئلة حول شروطنا؟'}</h2>
            <p>
              {language === 'en'
                ? 'Need clarification on any of our terms? We\'re here to help explain our policies.'
                : 'تحتاج إلى توضيح حول أي من شروطنا؟ نحن هنا للمساعدة في شرح سياساتنا.'}
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

export default TermsOfService;
