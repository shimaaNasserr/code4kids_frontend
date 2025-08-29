import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar, Spinner, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlay, FaBook, FaGamepad, FaCode, FaRobot, FaLanguage } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/config';
import './Courses.css';
import { useLanguage } from '../../components/NavBar/Navbar';

// أيقونات بديلة
const getCourseIcon = (courseId) => {
  const icons = [
    <FaCode className="h-100 w-100 p-3" />,
    <FaGamepad className="h-100 w-100 p-3" />,
    <FaRobot className="h-100 w-100 p-3" />,
    <FaBook className="h-100 w-100 p-3" />
  ];
  return icons[courseId % icons.length];
};

// Badge للمستوى
const getDifficultyBadge = (difficulty, language) => {
  const difficulties = {
    beginner: { emoji: '😊', en: 'Beginner', ar: 'مبتدئ', class: 'difficulty-easy' },
    intermediate: { emoji: '🤔', en: 'Intermediate', ar: 'متوسط', class: 'difficulty-medium' },
    advanced: { emoji: '💪', en: 'Advanced', ar: 'متقدم', class: 'difficulty-hard' }
  };

  const level = difficulty?.toLowerCase() || 'beginner';
  const diff = difficulties[level] || difficulties.beginner;
  return { ...diff, text: language === 'ar' ? diff.ar : diff.en };
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ناخد الترجمة من الـ Navbar Language Context
  const { translations: t, language, isRTL } = useLanguage();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("courses/"); // ✅ زي الكود القديم
        setCourses(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(t.error || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [language, t]);

  // Progress ثابت (لحد ما ييجي من الباك اند)
  const getCourseProgress = () => {
    return { percent: 0, text: "0 / 0 Lessons", completedText: "0% Completed" };
  };

  const getCourseDetails = (course) => {
    const isArabic = language === 'ar';
    const title = isArabic ? course.title_ar || course.title : course.title;
    const description = isArabic ? course.description_ar || course.description : course.description;
    const truncateText = (text, maxLength = 120) => text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return {
      title,
      description: truncateText(description),
      fullDescription: description,
      language: course.language || language,
      difficulty: getDifficultyBadge(course.level, language) // ✅ استخدم level زي القديم
    };
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" className="text-primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 h5">{t.loading || "Loading..."}</p>
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

  if (courses.length === 0) {
    return (
      <Container className="py-5 text-center">
        <motion.div className="empty-state p-5 rounded-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FaBook className="text-muted mb-3" size={64} />
          <h3>{t.noCourses || "No Courses Yet"}</h3>
          <p className="text-muted">{t.moreCoursesSoon || "More courses coming soon"}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            {t.refresh || "Refresh"}
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
        <h1 className="display-4 fw-bold mb-3 gradient-text">
          {t.title || "Let's Start Learning!"}
        </h1>
        <p className="lead text-muted">
          {t.subtitle || "Discover fun and exciting coding adventures!"}
        </p>
      </motion.div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course, index) => {
          const progress = getCourseProgress(course);
          const details = getCourseDetails(course);
          const isStarted = progress.percent > 0;

          return (
            <Col key={course.id} className="d-flex">
              <motion.div 
                className={`course-card w-100 ${index % 3 === 0 ? 'card-color-1' : index % 3 === 1 ? 'card-color-2' : 'card-color-3'}`}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="course-image-container">
                  {course.image_url? (
                    <img 
                      src={course.image_url} 
                      alt={details.title} 
                      className="course-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="course-icon-fallback">
                      {getCourseIcon(course.id)}
                    </div>
                  )}
                  <span className={`difficulty-badge ${details.difficulty.class}`}>
                    {details.difficulty.emoji} {details.difficulty.text}
                  </span>
                  </div>

                <div className="card-body">
                  <h5 className="card-title fw-bold">{details.title}</h5>
                  <OverlayTrigger placement="top" overlay={<Tooltip>{details.fullDescription}</Tooltip>}>
                    <p className="card-text">{details.description}</p>
                  </OverlayTrigger>

                  <div className="progress-container mt-3">
                    <small className="d-flex justify-content-between mb-1">
                      <span>{progress.completedText}</span>
                      <span className="text-primary">{progress.text}</span>
                    </small>
                    <ProgressBar now={progress.percent} variant="success" />
                  </div>

                  <motion.div 
                    className="start-button-container"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-100 py-2 mt-3 start-now-button"
                      onClick={() => navigate(`/courses/${course.id}/lessons`)}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <FaPlay className="me-2" />
                        <span className="fw-bold">
                          {isStarted ? (t.continue || "Continue Adventure!") : (t.start || "Start Learning!")}
                        </span>
                        <span className="sparkle">✨</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Courses;
