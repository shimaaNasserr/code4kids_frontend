import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './EvolvedRobotCharacter.css';

const EvolvedRobotCharacter = ({ language = 'en' }) => {
  const [chestSymbol, setChestSymbol] = useState('❤️');
  
  const greetings = {
    en: "Hello, welcome to your coding journey!",
    ar: "مرحباً، أهلاً بك في رحلة البرمجة!"
  };

  const encouragements = {
    en: [
      "Ready to become a coding hero?",
      "Let's build amazing things together!",
      "Your adventure starts here!",
      "Time to unlock your potential!"
    ],
    ar: [
      "مستعد لتصبح بطل البرمجة؟",
      "لنبني أشياء رائعة معاً!",
      "مغامرتك تبدأ هنا!",
      "حان وقت إطلاق إمكاناتك!"
    ]
  };

  // Chest screen symbol rotation
  useEffect(() => {
    const symbols = ['❤️', '⭐', '💎', '🚀', '⚡', '🎯'];
    const interval = setInterval(() => {
      setChestSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="evolved-robot-container">
      {/* Floating particles around robot */}
      <div className="robot-particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [-30, -80, -30],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.4
            }}
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`
            }}
          >
            {['⭐', '💻', '🚀', '⚡', '🎯', '💡', '🔧', '⚙️'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Main Robot SVG */}
      <motion.div
        className="evolved-robot-main"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          width="320"
          height="380"
          viewBox="0 0 320 380"
          className="evolved-robot-svg"
        >
          {/* Robot Shadow */}
          <ellipse cx="160" cy="370" rx="70" ry="10" fill="rgba(0,0,0,0.1)" />
          
          {/* Robot Legs */}
          <motion.rect
            x="120"
            y="280"
            width="25"
            height="50"
            rx="12"
            fill="#FFD93D"
            stroke="#E6C200"
            strokeWidth="3"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.rect
            x="175"
            y="280"
            width="25"
            height="50"
            rx="12"
            fill="#FFD93D"
            stroke="#E6C200"
            strokeWidth="3"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          
          {/* Robot Feet */}
          <ellipse cx="132" cy="340" rx="22" ry="10" fill="#FF6B6B" stroke="#CC5555" strokeWidth="2" />
          <ellipse cx="187" cy="340" rx="22" ry="10" fill="#FF6B6B" stroke="#CC5555" strokeWidth="2" />
          
          {/* Robot Body */}
          <rect x="90" y="140" width="140" height="160" rx="25" fill="#4ECDC4" stroke="#2E8B8B" strokeWidth="4" />
          
          {/* Chest Screen */}
          <motion.rect
            x="130"
            y="180"
            width="60"
            height="50"
            rx="10"
            fill="#1A1A1A"
            stroke="#4ECDC4"
            strokeWidth="3"
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(78, 205, 196, 0.5)",
                "0 0 20px rgba(78, 205, 196, 0.8)",
                "0 0 10px rgba(78, 205, 196, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Chest Screen Content */}
          <motion.text
            x="160"
            y="210"
            textAnchor="middle"
            fontSize="24"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {chestSymbol}
          </motion.text>
          
          {/* Control Panel */}
          <circle cx="110" cy="200" r="6" fill="#FF6B6B" />
          <circle cx="110" cy="220" r="6" fill="#FFD93D" />
          <circle cx="210" cy="200" r="6" fill="#4ECDC4" />
          <circle cx="210" cy="220" r="6" fill="#FF6B6B" />
          
          {/* Robot Head */}
          <rect x="100" y="50" width="120" height="100" rx="20" fill="#FF6B6B" stroke="#CC5555" strokeWidth="4" />
          
          {/* Coding Helmet */}
          <path
            d="M 95 50 Q 160 20 225 50 L 220 70 Q 160 40 100 70 Z"
            fill="#FFD93D"
            stroke="#E6C200"
            strokeWidth="3"
          />
          <circle cx="160" cy="45" r="8" fill="#4ECDC4" />
          <motion.line
            x1="160"
            y1="37"
            x2="160"
            y2="25"
            stroke="#4ECDC4"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Robot Eyes */}
          <motion.circle
            cx="130"
            cy="90"
            r="15"
            fill="#FFF"
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="190"
            cy="90"
            r="15"
            fill="#FFF"
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
          />
          <circle cx="130" cy="90" r="8" fill="#333" />
          <circle cx="190" cy="90" r="8" fill="#333" />
          <circle cx="132" cy="87" r="3" fill="#FFF" />
          <circle cx="192" cy="87" r="3" fill="#FFF" />
          
          {/* Robot Smile */}
          <motion.path
            d="M 140 120 Q 160 135 180 120"
            stroke="#333"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{ d: [
              "M 140 120 Q 160 135 180 120",
              "M 140 125 Q 160 140 180 125",
              "M 140 120 Q 160 135 180 120"
            ]}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Robot Arms */}
          <motion.rect
            x="50"
            y="160"
            width="40"
            height="18"
            rx="9"
            fill="#4ECDC4"
            stroke="#2E8B8B"
            strokeWidth="3"
            animate={{ 
              rotate: [0, -20, 20, 0],
              x: [50, 45, 55, 50]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ transformOrigin: "90px 169px" }}
          />
          <motion.rect
            x="230"
            y="160"
            width="40"
            height="18"
            rx="9"
            fill="#4ECDC4"
            stroke="#2E8B8B"
            strokeWidth="3"
            animate={{ 
              rotate: [0, 20, -20, 0],
              x: [230, 235, 225, 230]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{ transformOrigin: "230px 169px" }}
          />
          
          {/* Robot Hands */}
          <motion.circle
            cx="35"
            cy="169"
            r="15"
            fill="#FFD93D"
            stroke="#E6C200"
            strokeWidth="3"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="285"
            cy="169"
            r="15"
            fill="#FFD93D"
            stroke="#E6C200"
            strokeWidth="3"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -360]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
          
          {/* Hand Details */}
          <text x="35" y="175" textAnchor="middle" fontSize="12">👋</text>
          <text x="285" y="175" textAnchor="middle" fontSize="12">✨</text>
        </svg>
      </motion.div>

      {/* Speech Bubble */}
      <motion.div
        className="evolved-robot-speech"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200,
          delay: 0.8 
        }}
      >
        <div className="speech-main">
          {greetings[language]}
        </div>
        <motion.div
          className="speech-sub"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {encouragements[language][Math.floor(Math.random() * encouragements[language].length)]}
        </motion.div>
        <div className="speech-tail"></div>
      </motion.div>

      {/* Floating Code Elements */}
      <div className="code-elements">
        {['function()', 'class Robot', 'if (happy)', 'while (learning)', 'return joy;', 'console.log("Hi!")'].map((code, i) => (
          <motion.div
            key={i}
            className="code-element"
            animate={{
              y: [-15, -50, -15],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.4, 0.9, 0.4],
              rotate: [0, 360]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 1.2
            }}
          >
            {code}
          </motion.div>
        ))}
      </div>

      {/* Energy Rings */}
      <div className="energy-rings">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="energy-ring"
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.8, 0.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(EvolvedRobotCharacter);
