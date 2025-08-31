import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar, Spinner, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlay, FaClock, FaGamepad, FaCode, FaRobot, FaPuzzlePiece, FaStar, FaTrophy, FaRocket, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Games.css';
import { useLanguage } from '../../components/NavBar/Navbar';

// Games & Fun activities data
const gamesAndFunActivities = [
  {
    id: 1,
    title: "Code Combat",
    title_ar: "معركة البرمجة",
    description: "Learn programming through epic RPG adventures! Battle monsters and solve quests using real code.",
    description_ar: "تعلم البرمجة من خلال مغامرات آر بي جي ملحمية! حارب الوحوش وحل المهام باستخدام كود حقيقي.",
    duration: 45,
    difficulty: "intermediate",
    image_url: "https://res.cloudinary.com/dqiameqyd/image/upload/v1735671600/codecombat-game.jpg",
    progress: 40,
    totalSteps: 15,
    completedSteps: 6,
    category: "rpg",
    skills: ["Python", "JavaScript", "Problem Solving"],
    rating: 4.8,
    players: "1.2M+"
  },
  {
    id: 2,
    title: "Scratch Jr Adventures",
    title_ar: "مغامرات سكراتش الصغير",
    description: "Create interactive stories and games with colorful blocks! Perfect for young coders to start their journey.",
    description_ar: "أنشئ قصص وألعاب تفاعلية بكتل ملونة! مثالي للمبرمجين الصغار لبدء رحلتهم.",
    duration: 30,
    difficulty: "beginner",
    image_url: "https://res.cloudinary.com/dqiameqyd/image/upload/v1735671600/scratch-jr-game.jpg",
    progress: 75,
    totalSteps: 8,
    completedSteps: 6,
    category: "creative",
    skills: ["Visual Programming", "Storytelling", "Animation"],
    rating: 4.9,
    players: "800K+"
  },
  {
    id: 3,
    title: "Robot Maze Challenge",
    title_ar: "تحدي متاهة الروبوت",
    description: "Guide your robot through challenging mazes using programming logic and algorithms!",
    description_ar: "وجه روبوتك عبر متاهات صعبة باستخدام منطق البرمجة والخوارزميات!",
    duration: 35,
    difficulty: "beginner",
    image_url: "https://res.cloudinary.com/dqiameqyd/image/upload/v1735671600/robot-maze-game.jpg",
    progress: 100,
    totalSteps: 10,
    completedSteps: 10,
    category: "puzzle",
    skills: ["Algorithms", "Logic", "Problem Solving"],
    rating: 4.7,
    players: "650K+"
  },
  {
    id: 4,
    title: "Code Monkey Island",
    title_ar: "جزيرة القرد المبرمج",
    description: "Help the monkey collect bananas by writing code! Learn loops, functions, and variables in a tropical paradise.",
    description_ar: "ساعد القرد في جمع الموز بكتابة الكود! تعلم الحلقات والوظائف والمتغيرات في جنة استوائية.",
    duration: 40,
    difficulty: "beginner",
    image_url: "https://res.cloudinary.com/dqiameqyd/image/upload/v1735671600/code-monkey-game.jpg",
    progress: 20,
    totalSteps: 12,
    completedSteps: 2,
    category: "adventure",
    skills: ["Loops", "Functions", "Variables"],
    rating: 4.6,
    players: "950K+"
  },
  {
    id: 5,
    title: "Pixel Art Creator",
    title_ar: "منشئ فن البكسل",
    description: "Create amazing pixel art while learning about coordinates, loops, and digital art concepts!",
    description_ar: "أنشئ فن بكسل مذهل أثناء تعلم الإحداثيات والحلقات ومفاهيم الفن الرقمي!",
    duration: 50,
    difficulty: "intermediate",
    image_url: "https://res.cloudinary.com/dqiameqyd/image/upload/v1735671600/pixel-art-game.jpg",
    progress: 0,
    totalSteps: 14,
    completedSteps: 0,
    category: "creative",
    skills: ["Coordinates", "Art", "Loops"],
    rating: 4.5,
    players: "420K+"
  },
  {
    id: 6,
    title: "Space Code Explorer",
    title_ar: "مستكشف كود الفضاء",
    description: "Navigate through space while learning advanced programming concepts! Build rockets and explore galaxies.",
    description_ar: "تنقل عبر الفضاء أثناء تعلم مفاهيم البرمجة المتقدمة! ابني صواريخ واستكشف المجرات.",
    duration: 60,
    difficulty: "advanced",
    image_url: "https://res.cloudinary.com/dqiameqyd/image/upload/v1735671600/space-explorer-game.jpg",
    progress: 85,
    totalSteps: 18,
    completedSteps: 15,
    category: "space",
    skills: ["Advanced Logic", "Physics", "Game Development"],
    rating: 4.9,
    players: "320K+"
  }
];

// Get game icon based on category
const getGameIcon = (category) => {
  const icons = {
    rpg: <FaRocket className="h-100 w-100 p-3" />,
    creative: <FaPuzzlePiece className="h-100 w-100 p-3" />,
    puzzle: <FaRobot className="h-100 w-100 p-3" />,
    adventure: <FaGamepad className="h-100 w-100 p-3" />,
    space: <FaRocket className="h-100 w-100 p-3" />
  };
  return icons[category] || <FaGamepad className="h-100 w-100 p-3" />;
};

// Badge for difficulty
const getDifficultyBadge = (difficulty, language) => {
  const difficulties = {
    beginner: { emoji: '🌟', en: 'Beginner', ar: 'مبتدئ', class: 'difficulty-easy' },
    intermediate: { emoji: '⚡', en: 'Intermediate', ar: 'متوسط', class: 'difficulty-medium' },
    advanced: { emoji: '🚀', en: 'Advanced', ar: 'متقدم', class: 'difficulty-hard' }
  };

  const level = difficulty?.toLowerCase() || 'beginner';
  const diff = difficulties[level] || difficulties.beginner;
  return { ...diff, text: language === 'ar' ? diff.ar : diff.en };
};

const Games = () => {
  const [games, setGames] = useState(gamesAndFunActivities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { translations: t, language, isRTL } = useLanguage();

  // Simulate loading for demo purposes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getGameProgress = (game) => {
    const percent = Math.round((game.completedSteps / game.totalSteps) * 100);
    return {
      percent,
      text: `${game.completedSteps} / ${game.totalSteps} Levels`,
      completedText: `${percent}% Completed`
    };
  };

  const getGameDetails = (game) => {
    const isArabic = language === 'ar';
    const title = isArabic ? game.title_ar || game.title : game.title;
    const description = isArabic ? game.description_ar || game.description : game.description;
    const truncateText = (text, maxLength = 120) => text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return {
      title,
      description: truncateText(description),
      fullDescription: description,
      difficulty: getDifficultyBadge(game.difficulty, language)
    };
  };

  const handleStartGame = (gameId) => {
    // For demo purposes, just show an alert
    // In real implementation, this would navigate to the game
    alert(`Starting Game ${gameId}!`);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" className="text-primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 h5">{t.loading || "Loading Games & Fun..."}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="rounded-lg">
          <div className="d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={`py-5 ${isRTL ? 'rtl text-right' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-5"
      >
        <div className="games-header mb-4">
          <FaGamepad className="games-icon" />
          <h1 className="display-4 fw-bold mb-3 gradient-text">
            {language === 'ar' ? 'الألعاب والمرح' : 'Games & Fun'}
          </h1>
        </div>
        <p className="lead text-muted">
          {language === 'ar' 
            ? 'تعلم البرمجة من خلال ألعاب ممتعة ومثيرة! اجعل التعلم مغامرة لا تُنسى.'
            : 'Learn programming through fun and exciting games! Make learning an unforgettable adventure.'
          }
        </p>
        <div className="stats-container mt-4">
          <div className="stat-item">
            <FaTrophy className="stat-icon" />
            <span>{games.filter(g => g.progress > 0).length} Started</span>
          </div>
          <div className="stat-item">
            <FaStar className="stat-icon" />
            <span>{games.filter(g => g.progress === 100).length} Completed</span>
          </div>
          <div className="stat-item">
            <FaHeart className="stat-icon" />
            <span>{games.reduce((acc, g) => acc + parseFloat(g.rating), 0).toFixed(1)} Avg Rating</span>
          </div>
        </div>
      </motion.div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {games.map((game, index) => {
          const progress = getGameProgress(game);
          const details = getGameDetails(game);
          const isStarted = progress.percent > 0;
          const isCompleted = progress.percent === 100;

          return (
            <Col key={game.id} className="d-flex">
              <motion.div 
                className={`game-card w-100 ${index % 3 === 0 ? 'card-color-1' : index % 3 === 1 ? 'card-color-2' : 'card-color-3'}`}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="game-image-container">
                  {game.image_url ? (
                    <img 
                      src={game.image_url} 
                      alt={details.title} 
                      className="game-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="game-icon-fallback">
                      {getGameIcon(game.category)}
                    </div>
                  )}
                  
                  <span className={`difficulty-badge ${details.difficulty.class}`}>
                    {details.difficulty.emoji} {details.difficulty.text}
                  </span>
                  
                  <div className="duration-badge">
                    <FaClock className="me-1" />
                    {game.duration} min
                  </div>

                  <div className="rating-badge">
                    <FaStar className="me-1" />
                    {game.rating}
                  </div>

                  <div className="players-badge">
                    <FaGamepad className="me-1" />
                    {game.players}
                  </div>
                  
                  {isCompleted && (
                    <div className="completion-badge">
                      <FaTrophy className="me-1" />
                      {language === 'ar' ? 'مكتمل' : 'Mastered'}
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h5 className="card-title fw-bold">{details.title}</h5>
                  <OverlayTrigger placement="top" overlay={<Tooltip>{details.fullDescription}</Tooltip>}>
                    <p className="card-text">{details.description}</p>
                  </OverlayTrigger>

                  <div className="skills-container mb-3">
                    <small className="text-muted fw-bold">
                      {language === 'ar' ? 'المهارات:' : 'Skills:'}
                    </small>
                    <div className="skills-tags mt-1">
                      {game.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="progress-container mt-3">
                    <small className="d-flex justify-content-between mb-1">
                      <span>{progress.completedText}</span>
                      <span className="text-primary">{progress.text}</span>
                    </small>
                    <ProgressBar 
                      now={progress.percent} 
                      variant={isCompleted ? "success" : "primary"}
                      className="game-progress-bar"
                    />
                  </div>

                  <motion.div 
                    className="start-button-container"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className={`w-100 py-2 mt-3 ${isCompleted ? 'completed-button' : isStarted ? 'continue-button' : 'start-button'}`}
                      onClick={() => handleStartGame(game.id)}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        {isCompleted ? (
                          <>
                            <FaTrophy className="me-2" />
                            <span className="fw-bold">
                              {language === 'ar' ? 'العب مرة أخرى' : 'Play Again'}
                            </span>
                          </>
                        ) : (
                          <>
                            <FaPlay className="me-2" />
                            <span className="fw-bold">
                              {isStarted 
                                ? (language === 'ar' ? 'متابعة اللعب!' : 'Continue Playing!') 
                                : (language === 'ar' ? 'ابدأ اللعب!' : 'Start Playing!')
                              }
                            </span>
                          </>
                        )}
                        <span className="sparkle">🎮</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      {/* Overall Progress Section */}
      <motion.div 
        className="overall-progress-section mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-center mb-4 fw-bold">
          {language === 'ar' ? 'إنجازاتك في الألعاب' : 'Your Gaming Achievements'}
        </h3>
        <div className="overall-progress-card">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="progress-info">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">
                    {language === 'ar' ? 'الألعاب المكتملة' : 'Games Mastered'}
                  </span>
                  <span className="text-primary fw-bold">
                    {games.filter(g => g.progress === 100).length} / {games.length}
                  </span>
                </div>
                <ProgressBar 
                  now={(games.filter(g => g.progress === 100).length / games.length) * 100} 
                  variant="success"
                  className="overall-progress-bar"
                />
                
                <div className="d-flex justify-content-between mt-3 mb-2">
                  <span className="fw-bold">
                    {language === 'ar' ? 'التقدم الإجمالي' : 'Overall Progress'}
                  </span>
                  <span className="text-warning fw-bold">
                    {Math.round(games.reduce((acc, g) => acc + g.progress, 0) / games.length)}%
                  </span>
                </div>
                <ProgressBar 
                  now={games.reduce((acc, g) => acc + g.progress, 0) / games.length} 
                  variant="warning"
                  className="overall-progress-bar"
                />
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="achievement-badge">
                <FaGamepad className="achievement-icon" />
                <div className="achievement-text">
                  <div className="achievement-title">
                    {language === 'ar' ? 'لاعب محترف' : 'Gaming Pro'}
                  </div>
                  <div className="achievement-subtitle">
                    {language === 'ar' ? 'استمر في اللعب!' : 'Keep Playing!'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </motion.div>

      {/* Fun Facts Section */}
      <motion.div 
        className="fun-facts-section mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-center mb-4 fw-bold">
          {language === 'ar' ? 'حقائق ممتعة' : 'Fun Facts'}
        </h3>
        <Row className="g-3">
          <Col md={4}>
            <div className="fun-fact-card">
              <FaCode className="fun-fact-icon" />
              <h5>{language === 'ar' ? 'تعلم أثناء اللعب' : 'Learn While Playing'}</h5>
              <p>{language === 'ar' ? 'كل لعبة تعلمك مفاهيم برمجة حقيقية' : 'Every game teaches real programming concepts'}</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="fun-fact-card">
              <FaTrophy className="fun-fact-icon" />
              <h5>{language === 'ar' ? 'اكسب الجوائز' : 'Earn Rewards'}</h5>
              <p>{language === 'ar' ? 'احصل على شارات وجوائز عند إكمال التحديات' : 'Get badges and rewards for completing challenges'}</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="fun-fact-card">
              <FaRocket className="fun-fact-icon" />
              <h5>{language === 'ar' ? 'تقدم سريع' : 'Fast Progress'}</h5>
              <p>{language === 'ar' ? 'تتبع تقدمك وشاهد مهاراتك تتطور' : 'Track your progress and watch your skills evolve'}</p>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Games;
