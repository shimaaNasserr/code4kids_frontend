import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../components/NavBar/Navbar';
import './LearningJourney.css';

const LearningJourney = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const learningSteps = [
    {
      id: 1,
      titleEn: "BLOCK CODING",
      titleAr: "البرمجة بالكتل",
      icon: "🧩",
      color: "#FF6B9D", // Pink
      descriptionEn: "Start with visual blocks",
      descriptionAr: "ابدأ بالكتل البصرية"
    },
    {
      id: 2,
      titleEn: "SCRATCH GAMES",
      titleAr: "ألعاب سكراتش",
      icon: "🎮",
      color: "#4ECDC4", // Teal
      descriptionEn: "Create fun games",
      descriptionAr: "أنشئ ألعاباً ممتعة"
    },
    {
      id: 3,
      titleEn: "PYTHON BASICS",
      titleAr: "أساسيات بايثون",
      icon: "🐍",
      color: "#FFD93D", // Yellow
      descriptionEn: "Learn real coding",
      descriptionAr: "تعلم البرمجة الحقيقية"
    },
    {
      id: 4,
      titleEn: "WEB DESIGN",
      titleAr: "تصميم المواقع",
      icon: "💻",
      color: "#A8E6CF", // Light Green
      descriptionEn: "Build websites",
      descriptionAr: "ابن المواقع"
    },
    {
      id: 5,
      titleEn: "MOBILE APPS",
      titleAr: "تطبيقات الموبايل",
      icon: "📱",
      color: "#C44569", // Purple
      descriptionEn: "Create mobile apps",
      descriptionAr: "أنشئ تطبيقات الموبايل"
    },
    {
      id: 6,
      titleEn: "AI & ROBOTICS",
      titleAr: "الذكاء الاصطناعي",
      icon: "🤖",
      color: "#54A0FF", // Blue
      descriptionEn: "Future technology",
      descriptionAr: "تكنولوجيا المستقبل"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.section 
      className={`learning-journey ${isRTL ? 'rtl' : 'ltr'}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Elements */}
      <div className="journey-background">
        <div className="floating-stars">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}>⭐</div>
          ))}
        </div>
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="journey-container">
        {/* Header */}
        <motion.div 
          className="journey-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="journey-title">
            {isRTL ? (
              <>
                🚀 رحلتك في عالم البرمجة! ✨
              </>
            ) : (
              <>
                🚀 Your Programming Journey! ✨
              </>
            )}
          </h2>
          <p className="journey-subtitle">
            {isRTL 
              ? "كل خطوة تقربك من التميز والإبداع في عالم التكنولوجيا"
              : "Every step brings you closer to excellence and creativity in the world of technology"
            }
          </p>
        </motion.div>

        {/* Learning Steps Ladder */}
        <motion.div 
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Ladder Visual */}
          <div className="ladder-visual">
            <div className="ladder-rail ladder-left"></div>
            <div className="ladder-rail ladder-right"></div>
            {learningSteps.map((_, index) => (
              <div 
                key={index} 
                className="ladder-rung" 
                style={{ 
                  top: `${15 + (index * 14)}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Steps */}
          <div className="steps-grid">
            {learningSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`learning-step step-${index + 1}`}
                variants={stepVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                style={{
                  '--step-color': step.color,
                  '--step-index': index
                }}
              >
                <div className="step-content">
                  <div className="step-icon">
                    <span className="icon-emoji">{step.icon}</span>
                    <div className="icon-glow"></div>
                  </div>
                  
                  <div className="step-info">
                    <h3 className="step-title">
                      {isRTL ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="step-description">
                      {isRTL ? step.descriptionAr : step.descriptionEn}
                    </p>
                  </div>

                  <div className="step-number">
                    {step.id}
                  </div>
                </div>

                {/* Sparkle Effects */}
                <div className="step-sparkles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`sparkle sparkle-${i + 1}`}>✨</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="journey-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="start-journey-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(78, 205, 196, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isRTL ? "🎯 ابدأ رحلتك الآن!" : "🎯 Start Your Journey Now!"}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LearningJourney;
