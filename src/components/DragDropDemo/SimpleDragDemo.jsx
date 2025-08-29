import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPlay, FaRedo } from 'react-icons/fa';
import { useLanguage } from '../NavBar/Navbar';

const SimpleDragDemo = () => {
  const [draggedBlocks, setDraggedBlocks] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add error boundary for useLanguage hook
  let languageContext;
  try {
    languageContext = useLanguage();
  } catch (err) {
    console.error('Language context error in SimpleDragDemo:', err);
    // Fallback values
    languageContext = {
      language: 'en',
      playSound: () => {},
      isRTL: false
    };
  }
  
  const { language, playSound, isRTL } = languageContext;

  const codeBlocks = [
    { 
      id: 'move', 
      text: language === 'en' ? 'MOVE' : 'تحرك', 
      color: '#4ecdc4' 
    },
    { 
      id: 'turn', 
      text: language === 'en' ? 'TURN' : 'استدر', 
      color: '#ff6b6b' 
    },
    { 
      id: 'repeat', 
      text: language === 'en' ? 'REPEAT' : 'كرر', 
      color: '#ffd93d' 
    }
  ];

  const handleDragStart = (e, block) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(block));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const blockData = JSON.parse(e.dataTransfer.getData('text/plain'));
    setDraggedBlocks(prev => [...prev, blockData]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const runAnimation = () => {
    if (draggedBlocks.length === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  const resetDemo = () => {
    setDraggedBlocks([]);
    setIsAnimating(false);
  };

  return (
    <div className="simple-drag-demo" style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', margin: '2rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
          {language === 'en' ? 'Try Drag & Drop Coding!' : 'جرب البرمجة بالسحب والإفلات!'}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>
          {language === 'en' ? 'Drag the blocks to the area below!' : 'اسحب الكتل إلى المنطقة أدناه!'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
        {/* Code Blocks */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>
            {language === 'en' ? 'Code Blocks' : 'كتل الكود'}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {codeBlocks.map(block => (
              <motion.div
                key={block.id}
                draggable
                onDragStart={(e) => {
                  handleDragStart(e, block);
                  playSound && playSound('hover');
                }}
                style={{
                  background: block.color,
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '15px',
                  cursor: 'grab',
                  fontWeight: '600',
                  textAlign: 'center',
                  userSelect: 'none'
                }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, rotate: 5 }}
              >
                <FaCode style={{ marginRight: '0.5rem' }} />
                {block.text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>
            {language === 'en' ? 'Your Program' : 'برنامجك'}
          </h4>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              minHeight: '200px',
              background: 'rgba(255,255,255,0.1)',
              border: '3px dashed rgba(255,255,255,0.3)',
              borderRadius: '15px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            {draggedBlocks.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                color: 'rgba(255,255,255,0.6)',
                padding: '2rem',
                fontSize: '1.1rem'
              }}>
                {language === 'en' ? 'Drop code blocks here!' : 'اسحب كتل الكود هنا!'}
              </div>
            ) : (
              draggedBlocks.map((block, index) => (
                <motion.div
                  key={`${block.id}-${index}`}
                  style={{
                    background: block.color,
                    color: 'white',
                    padding: '0.8rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {block.text}
                </motion.div>
              ))
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
            <motion.button
              onClick={() => {
                runAnimation();
                playSound && playSound('click');
              }}
              disabled={draggedBlocks.length === 0 || isAnimating}
              style={{
                background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                cursor: draggedBlocks.length === 0 ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                opacity: draggedBlocks.length === 0 ? 0.5 : 1
              }}
              whileHover={draggedBlocks.length > 0 ? { scale: 1.05 } : {}}
              whileTap={draggedBlocks.length > 0 ? { scale: 0.95 } : {}}
            >
              <FaPlay style={{ [isRTL ? 'marginLeft' : 'marginRight']: '0.5rem' }} />
              {isAnimating 
                ? (language === 'en' ? 'Running...' : 'جاري التشغيل...')
                : (language === 'en' ? 'Run Code' : 'شغل الكود')
              }
            </motion.button>

            <motion.button
              onClick={() => {
                resetDemo();
                playSound && playSound('click');
              }}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo style={{ [isRTL ? 'marginLeft' : 'marginRight']: '0.5rem' }} />
              {language === 'en' ? 'Reset' : 'إعادة تعيين'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Robot Animation Area */}
      <div style={{ 
        marginTop: '2rem', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: '15px', 
        padding: '2rem',
        position: 'relative',
        minHeight: '100px'
      }}>
        <h4 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
          {language === 'en' ? 'Result' : 'النتيجة'}
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div
            style={{ fontSize: '3rem' }}
            animate={isAnimating ? { x: [0, 100, 200], rotate: [0, 90, 180] } : {}}
            transition={{ duration: 2 }}
          >
            🤖
          </motion.div>
          <div style={{ fontSize: '3rem' }}>⭐</div>
        </div>
        {isAnimating && (
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#ffd700',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            {language === 'en' ? 'Amazing! 🎉' : 'رائع! 🎉'}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SimpleDragDemo;
