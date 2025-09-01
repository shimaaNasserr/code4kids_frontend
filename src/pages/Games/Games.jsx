import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar, Spinner, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlay, FaClock, FaGamepad, FaCode, FaRobot, FaPuzzlePiece, FaStar, FaTrophy, FaRocket, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/config';
import './Games.css';
import { useLanguage } from '../../components/NavBar/Navbar';

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
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { translations: t, language, isRTL } = useLanguage();
  const token = localStorage.getItem("userToken");

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await axiosInstance.get("games/", { headers });
        setGames(response.data);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError(language === 'ar' ? 'خطأ في تحميل الألعاب' : 'Error loading games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [language, token]);

  const getGameProgress = (game) => {
    // Use progress data from API if available
    if (game.progress) {
      const percent = game.progress.completion_percentage;
      const completedLevels = game.progress.completed_levels;
      const totalLevels = game.total_levels;
      
      return {
        percent,
        text: `${completedLevels} / ${totalLevels} Levels`,
        completedText: `${Math.round(percent)}% Completed`
      };
    }
    
    // Fallback for no progress data
    return {
      percent: 0,
      text: `0 / ${game.total_levels || 10} Levels`,
      completedText: "0% Completed"
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

  const handleStartGame = async (game) => {
    try {
      if (token) {
        // Start a game session if user is authenticated
        await axiosInstance.post(`games/${game.id}/start-session/`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
  
      // Open the game URL from backend
      if (game.game_url) {
        window.open(game.game_url, "_blank");
      } else {
        alert("Game URL not available.");
      }
    } catch (error) {
      console.error('Error starting game:', error);
      alert('Error starting game. Please try again.');
    }
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
          <Button 
            variant="outline-danger" 
            className="mt-2" 
            onClick={() => window.location.reload()}
          >
            {language === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
          </Button>
        </Alert>
      </Container>
    );
  }

  if (games.length === 0 && !loading) {
    return (
      <Container className="py-5 text-center">
        <motion.div className="empty-state p-5 rounded-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FaGamepad className="text-muted mb-3" size={64} />
          <h3>{language === 'ar' ? 'لا توجد ألعاب حالياً' : 'No Games Available'}</h3>
          <p className="text-muted">{language === 'ar' ? 'المزيد من الألعاب قريباً' : 'More games coming soon'}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            {language === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
        </motion.div>
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
                      {getGameIcon(game.category_name?.toLowerCase() || 'adventure')}
                    </div>
                  )}
                  
                  <span className={`difficulty-badge ${details.difficulty.class}`}>
                    {details.difficulty.emoji} {details.difficulty.text}
                  </span>
                  
                  <div className="duration-badge">
                    <FaClock className="me-1" />
                    {game.duration_minutes} min
                  </div>

                  <div className="rating-badge">
                    <FaStar className="me-1" />
                    {game.rating}
                  </div>

                  <div className="players-badge">
                    <FaGamepad className="me-1" />
                    {game.player_count}
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
                      {(game.skills || []).map((skill, idx) => (
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
                      onClick={() => handleStartGame(game)}
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
