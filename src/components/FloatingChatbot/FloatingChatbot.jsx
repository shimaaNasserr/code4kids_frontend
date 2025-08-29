import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaVolumeUp, FaMicrophone } from 'react-icons/fa';
import { useLanguage } from '../NavBar/Navbar';
import './FloatingChatbot.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { language, playSound } = useLanguage();

  // Predefined responses for demo purposes
  const responses = {
    en: {
      greeting: "Hi there! I'm your coding buddy! 🤖 I'm here to help you learn programming. What would you like to know?",
      help: "I can help you with:\n• Basic coding concepts\n• How to use our drag-and-drop tools\n• Understanding programming logic\n• Tips for solving coding challenges",
      coding: "Coding is like giving instructions to a computer! Start with simple commands like 'move forward' or 'turn left'. Try our drag-and-drop demo!",
      scratch: "Scratch is a visual programming language perfect for beginners! You drag colorful blocks to create programs. It's like building with digital LEGO blocks!",
      python: "Python is a friendly programming language! It uses simple words like 'print' to display text. Want to try: print('Hello World!')?",
      game: "Games are made with code! You can create characters, make them move, add sounds, and build exciting adventures. Start with simple games first!",
      default: "That's a great question! Keep exploring and practicing. Remember, every expert was once a beginner! 🌟"
    },
    ar: {
      greeting: "مرحباً! أنا صديق البرمجة! 🤖 أنا هنا لمساعدتك في تعلم البرمجة. ماذا تريد أن تعرف؟",
      help: "يمكنني مساعدتك في:\n• مفاهيم البرمجة الأساسية\n• كيفية استخدام أدوات السحب والإفلات\n• فهم منطق البرمجة\n• نصائح لحل تحديات البرمجة",
      coding: "البرمجة مثل إعطاء تعليمات للكمبيوتر! ابدأ بأوامر بسيطة مثل 'تحرك للأمام' أو 'استدر يساراً'. جرب عرضنا التفاعلي!",
      scratch: "سكراتش هي لغة برمجة بصرية مثالية للمبتدئين! تسحب كتل ملونة لإنشاء البرامج. إنها مثل البناء بمكعبات ليغو الرقمية!",
      python: "بايثون لغة برمجة ودودة! تستخدم كلمات بسيطة مثل 'print' لعرض النص. تريد أن تجرب: print('مرحبا بالعالم!')؟",
      game: "الألعاب تُصنع بالكود! يمكنك إنشاء شخصيات وتحريكها وإضافة أصوات وبناء مغامرات مثيرة. ابدأ بألعاب بسيطة أولاً!",
      default: "هذا سؤال رائع! استمر في الاستكشاف والممارسة. تذكر، كل خبير كان مبتدئاً يوماً ما! 🌟"
    }
  };

  const quickReplies = {
    en: ["What is coding?", "How do I start?", "Help with Scratch", "Python basics", "Make a game"],
    ar: ["ما هي البرمجة؟", "كيف أبدأ؟", "مساعدة في سكراتش", "أساسيات بايثون", "صنع لعبة"]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting message
      setMessages([{
        id: 1,
        text: responses[language].greeting,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    playSound(isOpen ? 'click' : 'success');
    
    if (!isOpen) {
      // Focus input when opening
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const currentResponses = responses[language];
    
    if (lowerMessage.includes('help') || lowerMessage.includes('مساعدة')) {
      return currentResponses.help;
    } else if (lowerMessage.includes('cod') || lowerMessage.includes('برمج')) {
      return currentResponses.coding;
    } else if (lowerMessage.includes('scratch') || lowerMessage.includes('سكراتش')) {
      return currentResponses.scratch;
    } else if (lowerMessage.includes('python') || lowerMessage.includes('بايثون')) {
      return currentResponses.python;
    } else if (lowerMessage.includes('game') || lowerMessage.includes('لعب')) {
      return currentResponses.game;
    } else {
      return currentResponses.default;
    }
  };

  const sendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    playSound('click');

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      playSound('success');
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  // Speech recognition (basic implementation)
  const toggleListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        playSound('hover');

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          playSound('error');
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="floating-chatbot-button"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
          rotate: isOpen ? 180 : 0
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.3 }
        }}
      >
        <FaRobot />
        <motion.div
          className="chat-pulse"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {!isOpen && (
          <motion.div
            className="chat-tooltip"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            {language === 'en' ? 'Need help? Ask me!' : 'تحتاج مساعدة؟ اسألني!'}
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-chatbot-window"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <FaRobot className="header-robot" />
                <div>
                  <h4>{language === 'en' ? 'Coding Buddy' : 'صديق البرمجة'}</h4>
                  <span className="status-indicator">
                    {language === 'en' ? 'Online' : 'متصل'}
                  </span>
                </div>
              </div>
              <motion.button
                className="close-button"
                onClick={toggleChat}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Messages Container */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.sender === 'bot' && (
                    <div className="message-avatar">
                      <FaRobot />
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      {message.text.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="message bot typing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="quick-replies">
                {quickReplies[language].map((reply, index) => (
                  <motion.button
                    key={index}
                    className="quick-reply-button"
                    onClick={() => handleQuickReply(reply)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {reply}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="chat-input-area">
              <div className="input-container">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Type your question...' : 'اكتب سؤالك...'}
                  className="chat-input"
                  disabled={isTyping}
                />
                
                <div className="input-actions">
                  {('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
                    <motion.button
                      className={`voice-button ${isListening ? 'listening' : ''}`}
                      onClick={toggleListening}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={isTyping}
                    >
                      <FaMicrophone />
                    </motion.button>
                  )}
                  
                  <motion.button
                    className="send-button"
                    onClick={() => sendMessage()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <FaPaperPlane />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;
