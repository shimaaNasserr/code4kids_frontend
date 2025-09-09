import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { FaRobot, FaMagic, FaPlay, FaStar, FaHeart, FaRocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './ColorMagicGame.css';

// Detect touch device for drag and drop backend
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const dndBackend = isTouchDevice ? TouchBackend : HTML5Backend;

const ColorMagicGame = ({ language = 'ar', playSound = () => {} }) => {
  const navigate = useNavigate();
  const [wizardColor, setWizardColor] = useState('#4ECDC4'); // Default teal
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [workspaceBlocks, setWorkspaceBlocks] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showInlineSuccess, setShowInlineSuccess] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Game challenges with different types
  const gameChallenges = useMemo(() => [
    {
      id: 'color_change',
      type: 'color',
      targetColor: '#e74c3c',
      colorName: language === 'ar' ? 'الأحمر' : 'red',
      request: language === 'ar' ? 'اجعلني أرتدي اللون الأحمر!' : 'Make me wear red color!',
      successMessage: language === 'ar' ? 'رائع! أصبحت أحمر اللون!' : 'Amazing! I\'m now red!'
    },
    {
      id: 'color_change',
      type: 'color',
      targetColor: '#3498db',
      colorName: language === 'ar' ? 'الأزرق' : 'blue',
      request: language === 'ar' ? 'اجعلني أرتدي اللون الأزرق!' : 'Make me wear blue color!',
      successMessage: language === 'ar' ? 'رائع! أصبحت أزرق اللون!' : 'Amazing! I\'m now blue!'
    },
    {
      id: 'color_change',
      type: 'color',
      targetColor: '#2ecc71',
      colorName: language === 'ar' ? 'الأخضر' : 'green',
      request: language === 'ar' ? 'اجعلني أرتدي اللون الأخضر!' : 'Make me wear green color!',
      successMessage: language === 'ar' ? 'رائع! أصبحت أخضر اللون!' : 'Amazing! I\'m now green!'
    },
    {
      id: 'color_change',
      type: 'color',
      targetColor: '#f1c40f',
      colorName: language === 'ar' ? 'الأصفر' : 'yellow',
      request: language === 'ar' ? 'اجعلني أرتدي اللون الأصفر!' : 'Make me wear yellow color!',
      successMessage: language === 'ar' ? 'رائع! أصبحت أصفر اللون!' : 'Amazing! I\'m now yellow!'
    },
    {
      id: 'color_change',
      type: 'color',
      targetColor: '#9b59b6',
      colorName: language === 'ar' ? 'البنفسجي' : 'purple',
      request: language === 'ar' ? 'اجعلني أرتدي اللون البنفسجي!' : 'Make me wear purple color!',
      successMessage: language === 'ar' ? 'رائع! أصبحت بنفسجي اللون!' : 'Amazing! I\'m now purple!'
    },
    {
      id: 'sparkle_then_color',
      type: 'sequence',
      targetColor: '#e74c3c',
      colorName: language === 'ar' ? 'الأحمر' : 'red',
      request: language === 'ar' ? 'أضف بريقاً سحرياً ثم اجعلني أحمر!' : 'Add magic sparkles then make me red!',
      successMessage: language === 'ar' ? 'مذهل! بريق سحري ولون أحمر!' : 'Amazing! Magic sparkles and red color!'
    },
    {
      id: 'wait_then_color',
      type: 'sequence',
      targetColor: '#3498db',
      colorName: language === 'ar' ? 'الأزرق' : 'blue',
      request: language === 'ar' ? 'انتظر ثانية ثم اجعلني أزرق!' : 'Wait 1 second then make me blue!',
      successMessage: language === 'ar' ? 'ممتاز! انتظرت ثم أصبحت أزرق!' : 'Excellent! You waited then I became blue!'
    },
    {
      id: 'color_sparkle_color',
      type: 'complex',
      targetColor: '#2ecc71',
      colorName: language === 'ar' ? 'الأخضر' : 'green',
      request: language === 'ar' ? 'اجعلني أصفر، أضف بريقاً، ثم اجعلني أخضر!' : 'Make me yellow, add sparkles, then make me green!',
      successMessage: language === 'ar' ? 'رائع جداً! تسلسل سحري مذهل!' : 'Absolutely amazing! Incredible magic sequence!'
    }
  ], [language]);

  // Available coding blocks
  const availableBlocks = useMemo(() => [
    {
      id: 'red',
      type: 'color',
      color: '#e74c3c',
      text: language === 'ar' ? 'غيّر اللون إلى أحمر' : 'set color to red',
      icon: '🔴'
    },
    {
      id: 'blue',
      type: 'color', 
      color: '#3498db',
      text: language === 'ar' ? 'غيّر اللون إلى أزرق' : 'set color to blue',
      icon: '🔵'
    },
    {
      id: 'green',
      type: 'color',
      color: '#2ecc71',
      text: language === 'ar' ? 'غيّر اللون إلى أخضر' : 'set color to green',
      icon: '🟢'
    },
    {
      id: 'yellow',
      type: 'color',
      color: '#f1c40f',
      text: language === 'ar' ? 'غيّر اللون إلى أصفر' : 'set color to yellow',
      icon: '🟡'
    },
    {
      id: 'purple',
      type: 'color',
      color: '#9b59b6',
      text: language === 'ar' ? 'غيّر اللون إلى بنفسجي' : 'set color to purple',
      icon: '🟣'
    },
    {
      id: 'wait',
      type: 'action',
      color: '#95a5a6',
      text: language === 'ar' ? 'انتظر ثانية واحدة' : 'wait 1 second',
      icon: '⏱️'
    },
    {
      id: 'sparkle',
      type: 'action',
      color: '#f39c12',
      text: language === 'ar' ? 'أضف بريقاً سحرياً' : 'add magic sparkles',
      icon: '✨'
    }
  ], [language]);

  // Initialize challenge on component mount
  React.useEffect(() => {
    if (!currentChallenge) {
      const randomChallenge = gameChallenges[Math.floor(Math.random() * gameChallenges.length)];
      setCurrentChallenge(randomChallenge);
    }
  }, [gameChallenges, currentChallenge]);

  // Draggable Block Component
  const DraggableBlock = ({ block, isInWorkspace = false, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'block',
      item: { ...block, index, isInWorkspace },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <motion.div
        ref={drag}
        className={`coding-block ${block.type} ${isDragging ? 'dragging' : ''}`}
        style={{ 
          '--block-color': block.color,
          opacity: isDragging ? 0.5 : 1 
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="block-icon">{block.icon}</div>
        <div className="block-text">{block.text}</div>
        {isInWorkspace && (
          <button 
            className="remove-block"
            onClick={() => removeFromWorkspace(index)}
          >
            ×
          </button>
        )}
      </motion.div>
    );
  };

  // Workspace Drop Zone
  const WorkspaceDropZone = () => {
    const [{ isOver }, drop] = useDrop({
      accept: 'block',
      drop: (item) => {
        if (!item.isInWorkspace) {
          addToWorkspace(item);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div 
        ref={drop}
        className={`workspace-drop-zone ${isOver ? 'drag-over' : ''} ${workspaceBlocks.length === 0 ? 'empty' : ''}`}
      >
        {workspaceBlocks.length === 0 ? (
          <div className="workspace-placeholder">
            <FaMagic />
            <p>{language === 'ar' ? 'اسحب الكتل هنا لإنشاء السحر!' : 'Drag blocks here to create magic!'}</p>
          </div>
        ) : (
          <div className="workspace-blocks">
            {workspaceBlocks.map((block, index) => (
              <DraggableBlock 
                key={`workspace-${index}`} 
                block={block} 
                isInWorkspace={true}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Add block to workspace
  const addToWorkspace = useCallback((block) => {
    setWorkspaceBlocks(prev => [...prev, { ...block, id: `${block.id}-${Date.now()}` }]);
    playSound('success');
  }, [playSound]);

  // Remove block from workspace
  const removeFromWorkspace = useCallback((index) => {
    setWorkspaceBlocks(prev => prev.filter((_, i) => i !== index));
    playSound('click');
  }, [playSound]);

  // Check if challenge is completed
  const checkChallengeCompletion = useCallback((executedBlocks) => {
    if (!currentChallenge) return false;

    switch (currentChallenge.type) {
      case 'color':
        // Simple color change - just need the target color
        return executedBlocks.some(block => 
          block.type === 'color' && block.color === currentChallenge.targetColor
        );
        
      case 'sequence':
        if (currentChallenge.id === 'sparkle_then_color') {
          // Need sparkle followed by target color
          const sparkleIndex = executedBlocks.findIndex(block => block.id === 'sparkle');
          const colorIndex = executedBlocks.findIndex(block => 
            block.type === 'color' && block.color === currentChallenge.targetColor
          );
          return sparkleIndex !== -1 && colorIndex > sparkleIndex;
        }
        if (currentChallenge.id === 'wait_then_color') {
          // Need wait followed by target color
          const waitIndex = executedBlocks.findIndex(block => block.id === 'wait');
          const colorIndex = executedBlocks.findIndex(block => 
            block.type === 'color' && block.color === currentChallenge.targetColor
          );
          return waitIndex !== -1 && colorIndex > waitIndex;
        }
        break;
        
      case 'complex':
        if (currentChallenge.id === 'color_sparkle_color') {
          // Need yellow, then sparkle, then green
          const yellowIndex = executedBlocks.findIndex(block => 
            block.type === 'color' && block.color === '#f1c40f'
          );
          const sparkleIndex = executedBlocks.findIndex(block => block.id === 'sparkle');
          const greenIndex = executedBlocks.findIndex(block => 
            block.type === 'color' && block.color === '#2ecc71'
          );
          return yellowIndex !== -1 && sparkleIndex > yellowIndex && greenIndex > sparkleIndex;
        }
        break;
    }
    return false;
  }, [currentChallenge]);

  // Execute the magic code
  const executeMagic = useCallback(async () => {
    if (workspaceBlocks.length === 0 || !currentChallenge) return;
    
    setIsExecuting(true);
    setAnimationStep(0);
    playSound('magic');

    // Execute blocks sequentially
    for (let i = 0; i < workspaceBlocks.length; i++) {
      const block = workspaceBlocks[i];
      setAnimationStep(i + 1);
      
      if (block.type === 'color') {
        setWizardColor(block.color);
      } else if (block.type === 'action') {
        if (block.id === 'sparkle') {
          // Add sparkle effect
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { x: 0.5, y: 0.4 },
            colors: ['#FFD93D', '#4ECDC4']
          });
        }
      }
      
      // Wait between blocks
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Check if challenge is completed
    const isCompleted = checkChallengeCompletion(workspaceBlocks);
    
    if (isCompleted) {
      setTimeout(() => {
        setGameCompleted(true);
        setShowInlineSuccess(true);
        playSound('victory');
        
        // Confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4ECDC4', '#45B7D1', '#FFD93D', '#96CEB4']
        });
        
        // Hide success message after 4 seconds and reset
        setTimeout(() => {
          resetGame();
        }, 4000);
      }, 500);
    }
    
    setIsExecuting(false);
    setAnimationStep(0);
  }, [workspaceBlocks, currentChallenge, playSound, checkChallengeCompletion]);

  // Reset game
  const resetGame = useCallback(() => {
    setWizardColor('#4ECDC4');
    setWorkspaceBlocks([]);
    setGameCompleted(false);
    setShowInlineSuccess(false);
    setAnimationStep(0);
    
    // Set new random challenge
    const newChallenge = gameChallenges[Math.floor(Math.random() * gameChallenges.length)];
    setCurrentChallenge(newChallenge);
    
    playSound('click');
  }, [playSound, gameChallenges]);

  return (
    <DndProvider backend={dndBackend}>
      <motion.section 
        className="color-magic-game"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Magical Background */}
        <div className="magic-background">
          <div className="floating-sparkles">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>

        <div className="game-container">
          {/* Game Header */}
          <motion.div 
            className="game-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>
              🧙‍♀️ {language === 'ar' ? 'ساحرة الألوان!' : 'Color Magic Wizard!'} ✨
            </h2>
            <p>
              {language === 'ar' 
                ? 'ساعد الساحر الصغير في تغيير لونه باستخدام كتل البرمجة السحرية!'
                : 'Help the little wizard change colors using magical coding blocks!'}
            </p>
          </motion.div>

          {/* Game Area */}
          <div className="game-area">
            {/* Wizard Character */}
            <motion.div 
              className="wizard-area"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Challenge Request */}
              <motion.div 
                className="wizard-request"
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentChallenge?.request || (language === 'ar' ? 'جاري تحميل التحدي...' : 'Loading challenge...')}
              </motion.div>

              {/* Wizard Character */}
              <motion.div 
                className="wizard-character"
                style={{ '--wizard-color': wizardColor }}
                animate={isExecuting ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                } : {
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: isExecuting ? 0.5 : 3,
                  repeat: Infinity 
                }}
              >
                <div className="wizard-hat">🎩</div>
                <div className="wizard-body">
                  <FaRobot />
                </div>
                <div className="wizard-wand">🪄</div>
                
                {/* Magic Aura */}
                <motion.div 
                  className="magic-aura"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Execution Animation */}
              {isExecuting && (
                <motion.div 
                  className="execution-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <FaMagic />
                  <span>
                    {language === 'ar' ? `تنفيذ الخطوة ${animationStep}...` : `Executing step ${animationStep}...`}
                  </span>
                </motion.div>
              )}

              {/* Inline Success Message */}
              <AnimatePresence>
                {showInlineSuccess && (
                  <motion.div 
                    className="inline-success-message"
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  >
                    <div className="success-content">
                      <div className="success-icon">🎉</div>
                      <h3>
                        {language === 'ar' ? 'عمل رائع!' : 'Amazing Work!'}
                      </h3>
                      <p>
                        {currentChallenge?.successMessage || (language === 'ar' 
                          ? 'لقد نجحت في إكمال التحدي! هذا مجرد بداية سحر البرمجة.'
                          : "You successfully completed the challenge! This is just the beginning of programming magic.")}
                      </p>
                      <div className="cta-buttons">
                        <motion.button
                          className="cta-primary"
                          onClick={() => {
                            playSound('success');
                            navigate('/register');
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaRocket />
                          {language === 'ar' ? 'ابدأ مغامرتك!' : 'Start Your Adventure!'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Coding Blocks Panel */}
            <motion.div 
              className="blocks-panel"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3>
                🧩 {language === 'ar' ? 'كتل البرمجة السحرية' : 'Magic Coding Blocks'}
              </h3>
              <div className="available-blocks">
                {availableBlocks.map((block, index) => (
                  <DraggableBlock 
                    key={block.id} 
                    block={block} 
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Workspace */}
            <motion.div 
              className="workspace-area"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3>
                🎯 {language === 'ar' ? 'منطقة العمل' : 'Workspace'}
              </h3>
              <WorkspaceDropZone />
              
              {/* Control Buttons */}
              <div className="game-controls">
                <motion.button
                  className="execute-btn"
                  onClick={executeMagic}
                  disabled={workspaceBlocks.length === 0 || isExecuting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay />
                  {isExecuting 
                    ? (language === 'ar' ? 'تنفيذ السحر...' : 'Casting Magic...')
                    : (language === 'ar' ? 'شغّل السحر!' : 'Cast Magic!')
                  }
                </motion.button>

                <motion.button
                  className="reset-btn"
                  onClick={resetGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

      </motion.section>
    </DndProvider>
  );
};

export default React.memo(ColorMagicGame);
