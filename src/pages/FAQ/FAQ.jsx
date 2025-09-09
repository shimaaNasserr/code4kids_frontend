import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaQuestionCircle,
  FaRocket,
  FaGamepad,
  FaUsers,
  FaShieldAlt,
  FaCreditCard,
  FaCog,
  FaSearch
} from 'react-icons/fa';
import { useLanguage } from '../../components/NavBar/Navbar';
import './FAQ.css';

const FAQ = () => {
  const { language, isRTL } = useLanguage();
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    {
      id: 'all',
      name: language === 'en' ? 'All Questions' : 'جميع الأسئلة',
      icon: <FaQuestionCircle />,
      color: '#FF6B9D'
    },
    {
      id: 'getting-started',
      name: language === 'en' ? 'Getting Started' : 'البدء',
      icon: <FaRocket />,
      color: '#4ECDC4'
    },
    {
      id: 'learning',
      name: language === 'en' ? 'Learning & Games' : 'التعلم والألعاب',
      icon: <FaGamepad />,
      color: '#FFD93D'
    },
    {
      id: 'account',
      name: language === 'en' ? 'Account & Parents' : 'الحساب والوالدين',
      icon: <FaUsers />,
      color: '#A8E6CF'
    },
    {
      id: 'safety',
      name: language === 'en' ? 'Safety & Privacy' : 'الأمان والخصوصية',
      icon: <FaShieldAlt />,
      color: '#C44569'
    },
    {
      id: 'technical',
      name: language === 'en' ? 'Technical Support' : 'الدعم التقني',
      icon: <FaCog />,
      color: '#54A0FF'
    }
  ];

  const faqData = [
    {
      category: 'getting-started',
      question: language === 'en' ? 'How do I create an account for my child?' : 'كيف أنشئ حساباً لطفلي؟',
      answer: language === 'en' 
        ? 'Creating an account is easy! Click the "Sign Up" button, choose "Kid" as the role, and fill in the required information. Parents can also create accounts to monitor their child\'s progress.'
        : 'إنشاء حساب أمر سهل! انقر على زر "اشترك"، اختر "طفل" كدور، واملأ المعلومات المطلوبة. يمكن للوالدين أيضاً إنشاء حسابات لمراقبة تقدم أطفالهم.'
    },
    {
      category: 'getting-started',
      question: language === 'en' ? 'What age group is Code4Kids designed for?' : 'ما هي الفئة العمرية المصممة لها Code4Kids؟',
      answer: language === 'en'
        ? 'Code4Kids is designed for children aged 7-14 years old. Our curriculum is carefully crafted to match different skill levels, from complete beginners to intermediate young coders.'
        : 'تم تصميم Code4Kids للأطفال من عمر 7-14 سنة. منهجنا مصمم بعناية ليناسب مستويات مهارة مختلفة، من المبتدئين تماماً إلى المبرمجين الصغار المتوسطين.'
    },
    {
      category: 'learning',
      question: language === 'en' ? 'How does the drag-and-drop coding work?' : 'كيف تعمل البرمجة بالسحب والإفلات؟',
      answer: language === 'en'
        ? 'Our drag-and-drop interface is similar to Scratch! Kids can drag coding blocks and connect them to create programs. It\'s visual, intuitive, and makes learning programming concepts fun and easy.'
        : 'واجهة السحب والإفلات لدينا مشابهة لـ Scratch! يمكن للأطفال سحب كتل البرمجة وربطها لإنشاء برامج. إنها مرئية وبديهية وتجعل تعلم مفاهيم البرمجة ممتعاً وسهلاً.'
    },
    {
      category: 'learning',
      question: language === 'en' ? 'What programming concepts will my child learn?' : 'ما هي مفاهيم البرمجة التي سيتعلمها طفلي؟',
      answer: language === 'en'
        ? 'Children learn fundamental concepts like sequences, loops, conditionals, variables, and functions. We also cover problem-solving, logical thinking, and creativity through interactive projects and games.'
        : 'يتعلم الأطفال مفاهيم أساسية مثل التسلسلات والحلقات والشروط والمتغيرات والوظائف. نغطي أيضاً حل المشكلات والتفكير المنطقي والإبداع من خلال مشاريع وألعاب تفاعلية.'
    },
    {
      category: 'learning',
      question: language === 'en' ? 'How do the games and rewards work?' : 'كيف تعمل الألعاب والمكافآت؟',
      answer: language === 'en'
        ? 'Kids earn badges, stars, and points as they complete lessons and challenges. Our gamification system includes achievement unlocks, progress tracking, and celebration animations to keep learning exciting!'
        : 'يحصل الأطفال على شارات ونجوم ونقاط عند إكمال الدروس والتحديات. نظام التلعيب لدينا يتضمن فتح الإنجازات وتتبع التقدم ورسوم الاحتفال للحفاظ على إثارة التعلم!'
    },
    {
      category: 'account',
      question: language === 'en' ? 'Can parents track their child\'s progress?' : 'هل يمكن للوالدين تتبع تقدم أطفالهم؟',
      answer: language === 'en'
        ? 'Absolutely! Parents have access to a comprehensive dashboard showing their child\'s learning progress, completed lessons, earned badges, time spent learning, and areas of strength and improvement.'
        : 'بالطبع! يمكن للوالدين الوصول إلى لوحة تحكم شاملة تظهر تقدم طفلهم التعليمي والدروس المكتملة والشارات المكتسبة والوقت المقضي في التعلم ومناطق القوة والتحسين.'
    },
    {
      category: 'account',
      question: language === 'en' ? 'Is there a teacher dashboard available?' : 'هل تتوفر لوحة تحكم للمعلمين؟',
      answer: language === 'en'
        ? 'Yes! Teachers can create accounts to manage multiple students, assign lessons, track class progress, and generate reports. It\'s perfect for schools and coding clubs.'
        : 'نعم! يمكن للمعلمين إنشاء حسابات لإدارة عدة طلاب وتعيين الدروس وتتبع تقدم الفصل وإنشاء التقارير. إنه مثالي للمدارس ونوادي البرمجة.'
    },
    {
      category: 'safety',
      question: language === 'en' ? 'Is Code4Kids safe for children?' : 'هل Code4Kids آمن للأطفال؟',
      answer: language === 'en'
        ? 'Safety is our top priority! We follow strict privacy guidelines, have no chat features between users, use moderated content, and comply with COPPA regulations for children\'s online safety.'
        : 'الأمان أولويتنا القصوى! نتبع إرشادات خصوصية صارمة، وليس لدينا ميزات دردشة بين المستخدمين، ونستخدم محتوى مُراقب، ونلتزم بلوائح COPPA لأمان الأطفال عبر الإنترنت.'
    },
    {
      category: 'safety',
      question: language === 'en' ? 'What information do you collect from children?' : 'ما هي المعلومات التي تجمعونها من الأطفال؟',
      answer: language === 'en'
        ? 'We only collect essential information needed for the learning experience: username, age range, and learning progress. We never collect personal information like full names, addresses, or contact details from children.'
        : 'نجمع فقط المعلومات الأساسية المطلوبة لتجربة التعلم: اسم المستخدم والفئة العمرية وتقدم التعلم. لا نجمع أبداً معلومات شخصية مثل الأسماء الكاملة أو العناوين أو تفاصيل الاتصال من الأطفال.'
    },
    {
      category: 'technical',
      question: language === 'en' ? 'What devices and browsers are supported?' : 'ما هي الأجهزة والمتصفحات المدعومة؟',
      answer: language === 'en'
        ? 'Code4Kids works on computers, tablets, and smartphones. We support modern browsers like Chrome, Firefox, Safari, and Edge. The platform is responsive and works great on touch devices!'
        : 'تعمل Code4Kids على أجهزة الكمبيوتر والأجهزة اللوحية والهواتف الذكية. ندعم المتصفحات الحديثة مثل Chrome وFirefox وSafari وEdge. المنصة متجاوبة وتعمل بشكل رائع على الأجهزة اللمسية!'
    },
    {
      category: 'technical',
      question: language === 'en' ? 'My child is having trouble with audio/video. What should I do?' : 'طفلي يواجه مشكلة مع الصوت/الفيديو. ماذا يجب أن أفعل؟',
      answer: language === 'en'
        ? 'First, check your device\'s volume and browser permissions for audio/video. Try refreshing the page or using a different browser. If problems persist, contact our support team for personalized help.'
        : 'أولاً، تحقق من مستوى الصوت في جهازك وأذونات المتصفح للصوت/الفيديو. جرب تحديث الصفحة أو استخدام متصفح مختلف. إذا استمرت المشاكل، اتصل بفريق الدعم للحصول على مساعدة شخصية.'
    },
    {
      category: 'technical',
      question: language === 'en' ? 'Can Code4Kids work offline?' : 'هل يمكن لـ Code4Kids العمل بدون اتصال بالإنترنت؟',
      answer: language === 'en'
        ? 'Currently, Code4Kids requires an internet connection to access lessons and save progress. However, we\'re working on offline capabilities for basic coding activities in future updates!'
        : 'حالياً، تتطلب Code4Kids اتصالاً بالإنترنت للوصول إلى الدروس وحفظ التقدم. ومع ذلك، نعمل على إمكانيات العمل بدون اتصال للأنشطة البرمجية الأساسية في التحديثات المستقبلية!'
    }
  ];

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`faq-page ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <motion.section 
        className="faq-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="faq-hero-content">
          <motion.div
            className="faq-hero-icon"
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
            <FaQuestionCircle />
          </motion.div>
          <h1>{language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}</h1>
          <p>
            {language === 'en' 
              ? 'Find answers to the most common questions about Code4Kids. Can\'t find what you\'re looking for? Contact our support team!'
              : 'اعثر على إجابات للأسئلة الأكثر شيوعاً حول Code4Kids. لا تجد ما تبحث عنه؟ اتصل بفريق الدعم لدينا!'}
          </p>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section 
        className="faq-controls"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search questions...' : 'ابحث في الأسئلة...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {faqCategories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                style={{ '--category-color': category.color }}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Items */}
      <motion.section 
        className="faq-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="faq-list">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => {
                const isExpanded = expandedItems.has(index);
                const categoryInfo = faqCategories.find(cat => cat.id === faq.category);
                
                return (
                  <motion.div
                    key={index}
                    className="faq-item"
                    style={{ '--faq-color': categoryInfo?.color || '#FF6B9D' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    layout
                  >
                    <motion.div
                      className="faq-question"
                      onClick={() => toggleExpanded(index)}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="question-content">
                        <div className="question-icon">{categoryInfo?.icon}</div>
                        <h3>{faq.question}</h3>
                      </div>
                      <motion.div
                        className="expand-icon"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown />
                      </motion.div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="answer-content">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              className="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuestionCircle />
              <h3>{language === 'en' ? 'No questions found' : 'لم يتم العثور على أسئلة'}</h3>
              <p>
                {language === 'en'
                  ? 'Try adjusting your search or category filter, or contact our support team for help.'
                  : 'جرب تعديل البحث أو فلتر الفئة، أو اتصل بفريق الدعم للحصول على المساعدة.'}
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        className="faq-cta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="cta-content">
            <h2>{language === 'en' ? 'Still have questions?' : 'ما زال لديك أسئلة؟'}</h2>
            <p>
              {language === 'en'
                ? 'Our friendly support team is here to help! Get in touch and we\'ll get back to you as soon as possible.'
                : 'فريق الدعم الودود لدينا هنا للمساعدة! تواصل معنا وسنعاود الاتصال بك في أقرب وقت ممكن.'}
            </p>
            <div className="cta-buttons">
              <motion.a
                href="/contact-us"
                className="cta-btn primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
              </motion.a>
              <motion.a
                href="/help-center"
                className="cta-btn secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Help Center' : 'مركز المساعدة'}
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default FAQ;
