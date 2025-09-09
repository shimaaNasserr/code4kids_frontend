import React from 'react';
import { motion } from 'framer-motion';
import './VisualBreak.css';

const VisualBreak = ({ variant = 'journey' }) => {
  return (
    <motion.section 
      className={`visual-break visual-break-${variant}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="break-container">
        {/* Floating Elements */}
        <div className="floating-elements">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`floating-element element-${i + 1}`}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            >
              {i % 5 === 0 && '⭐'}
              {i % 5 === 1 && '✨'}
              {i % 5 === 2 && '🌟'}
              {i % 5 === 3 && '💫'}
              {i % 5 === 4 && '🔮'}
            </motion.div>
          ))}
        </div>

        {/* Wave Pattern */}
        <div className="wave-pattern">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <motion.path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#FF6B9D" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FFD93D" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#A8E6CF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C44569" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Geometric Shapes */}
        <div className="geometric-shapes">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`shape shape-${i + 1}`}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default VisualBreak;
