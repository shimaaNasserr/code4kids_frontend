import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RobotCharacter.css';

const RobotCharacter = ({ isActive = false, language = 'en', formData = {} }) => {
  const [currentExpression, setCurrentExpression] = useState('happy');
  const [isBlinking, setIsBlinking] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const expressions = {
    happy: { eyeScale: 1, eyeColor: '#4ECDC4', mouthPath: 'M15,25 Q25,35 35,25' },
    excited: { eyeScale: 1.2, eyeColor: '#FFD93D', mouthPath: 'M10,25 Q25,40 40,25' },
    thinking: { eyeScale: 0.8, eyeColor: '#9B59B6', mouthPath: 'M20,28 Q25,32 30,28' },
    celebrating: { eyeScale: 1.3, eyeColor: '#FF6B6B', mouthPath: 'M5,25 Q25,45 45,25' }
  };

  const messages = {
    en: {
      welcome: "Hi there! Ready to start coding? 🚀",
      typing: "Great choice of username! 👍",
      email: "Don't forget your email! 📧",
      role_kid: "A young explorer! How exciting! 🌟",
      role_parent: "Supporting young coders! Amazing! 👨‍👩‍👧‍👦",
      password: "Make it strong and secure! 🔐",
      celebrating: "Welcome to the coding family! 🎉",
      encouraging: "You're doing great! Keep going! 💪"
    },
    ar: {
      welcome: "مرحباً! مستعد لبدء البرمجة؟ 🚀",
      typing: "اختيار رائع للاسم! 👍", 
      email: "لا تنس البريد الإلكتروني! 📧",
      role_kid: "مستكشف صغير! كم هذا مثير! 🌟",
      role_parent: "تدعم المبرمجين الصغار! رائع! 👨‍👩‍👧‍👦",
      password: "اجعلها قوية وآمنة! 🔐",
      celebrating: "مرحباً بك في عائلة البرمجة! 🎉",
      encouraging: "أنت تقوم بعمل رائع! استمر! 💪"
    }
  };

  useEffect(() => {
    if (isActive) {
      setCurrentExpression('celebrating');
      setSpeechBubble(messages[language].celebrating);
      setShowSpeechBubble(true);
      
      setTimeout(() => {
        setShowSpeechBubble(false);
        setCurrentExpression('happy');
      }, 3000);
    }
  }, [isActive, language]);

  useEffect(() => {
    // React to form changes
    if (formData.username && formData.username.length > 2) {
      setCurrentExpression('excited');
      setSpeechBubble(messages[language].typing);
      setShowSpeechBubble(true);
      
      setTimeout(() => {
        setShowSpeechBubble(false);
        setCurrentExpression('happy');
      }, 2000);
    }
    
    if (formData.role === 'Kid') {
      setTimeout(() => {
        setSpeechBubble(messages[language].role_kid);
        setShowSpeechBubble(true);
        setTimeout(() => setShowSpeechBubble(false), 2500);
      }, 500);
    } else if (formData.role === 'Parent') {
      setTimeout(() => {
        setSpeechBubble(messages[language].role_parent);
        setShowSpeechBubble(true);
        setTimeout(() => setShowSpeechBubble(false), 2500);
      }, 500);
    }
  }, [formData, language]);

  useEffect(() => {
    // Random blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // Random encouraging messages
    const encourageInterval = setInterval(() => {
      if (!showSpeechBubble && !isActive) {
        setSpeechBubble(messages[language].encouraging);
        setShowSpeechBubble(true);
        setTimeout(() => setShowSpeechBubble(false), 2000);
      }
    }, 15000);

    return () => clearInterval(encourageInterval);
  }, [showSpeechBubble, isActive, language]);

  const currentExp = expressions[currentExpression];

  return (
    <div className="robot-character-container">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && speechBubble && (
          <motion.div
            className={`speech-bubble ${language === 'ar' ? 'rtl' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bubble-content">
              {speechBubble}
            </div>
            <div className="bubble-tail"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Character */}
      <motion.div
        className="robot-character"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.5 
        }}
      >
        <motion.div
          className="robot-body"
          animate={{
            y: [0, -8, 0],
            rotateZ: [-2, 2, -2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Robot Head */}
          <div className="robot-head">
            {/* Antenna */}
            <motion.div
              className="robot-antenna"
              animate={{
                rotate: [-10, 10, -10],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="antenna-ball"></div>
            </motion.div>

            {/* Eyes */}
            <div className="robot-eyes">
              <motion.div
                className="robot-eye left-eye"
                animate={{
                  scaleY: isBlinking ? 0.1 : currentExp.eyeScale,
                  backgroundColor: currentExp.eyeColor
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="eye-pupil"
                  animate={{
                    x: Math.sin(Date.now() * 0.001) * 2,
                    y: Math.cos(Date.now() * 0.001) * 1
                  }}
                />
              </motion.div>
              
              <motion.div
                className="robot-eye right-eye"
                animate={{
                  scaleY: isBlinking ? 0.1 : currentExp.eyeScale,
                  backgroundColor: currentExp.eyeColor
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="eye-pupil"
                  animate={{
                    x: Math.sin(Date.now() * 0.001) * 2,
                    y: Math.cos(Date.now() * 0.001) * 1
                  }}
                />
              </motion.div>
            </div>

            {/* Mouth */}
            <div className="robot-mouth">
              <svg width="50" height="40" viewBox="0 0 50 40">
                <motion.path
                  d={currentExp.mouthPath}
                  stroke="#333"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  animate={{
                    d: currentExp.mouthPath
                  }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </div>
          </div>

          {/* Robot Body */}
          <div className="robot-torso">
            {/* Chest Panel */}
            <div className="chest-panel">
              <motion.div
                className="chest-light"
                animate={{
                  backgroundColor: [currentExp.eyeColor, '#fff', currentExp.eyeColor],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Control Buttons */}
              <div className="control-buttons">
                <motion.div 
                  className="control-btn btn-1"
                  animate={{ 
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF6B6B'] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="control-btn btn-2"
                  animate={{ 
                    backgroundColor: ['#4ECDC4', '#FFD93D', '#FF6B6B', '#4ECDC4'] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <motion.div 
                  className="control-btn btn-3"
                  animate={{ 
                    backgroundColor: ['#FFD93D', '#FF6B6B', '#4ECDC4', '#FFD93D'] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
              </div>
            </div>
          </div>

          {/* Robot Arms */}
          <motion.div
            className="robot-arm left-arm"
            animate={{
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="arm-segment upper-arm"></div>
            <div className="arm-segment lower-arm"></div>
            <div className="robot-hand">
              <motion.div
                className="hand-finger"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="hand-finger"
                animate={{ rotate: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.7 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="robot-arm right-arm"
            animate={{
              rotate: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="arm-segment upper-arm"></div>
            <div className="arm-segment lower-arm"></div>
            <div className="robot-hand">
              <motion.div
                className="hand-finger"
                animate={{ rotate: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="hand-finger"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Particles Around Robot */}
        <div className="robot-particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="robot-particle"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4
              }}
              style={{
                left: `${20 + Math.cos(i) * 60}%`,
                top: `${30 + Math.sin(i) * 40}%`
              }}
            >
              {['⚡', '💫', '✨', '🔧', '⚙️', '💻'][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(RobotCharacter);