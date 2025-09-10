import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  Clock,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Lock,
  Award,
  Star,
  Sparkles,
  Zap
} from 'lucide-react';
import axiosInstance from '../../apis/config';
import Navbar from '../../components/NavBar/Navbar';
import './lessons.css';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const LessonsList = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // States
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Fetch course data
  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`courses/${courseId}/`);
      setCourse(response.data);
    } catch (err) {
      console.error('Error fetching course:', err);
      if (err.response?.status === 404) {
        setError(`Course with ID ${courseId} not found`);
      } else if (err.response?.status === 401) {
        setError('Please login to access this course');
      } else {
        setError('Failed to load course details');
      }
    }
  };

  // Fetch lessons for the course
  const fetchLessons = async () => {
    try {
      const response = await axiosInstance.get('lessons/');
      const courseLessons = response.data.filter(lesson => lesson.course === parseInt(courseId));
      setLessons(courseLessons.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Failed to load lessons');
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchCourse(), fetchLessons()]);
      } catch (err) {
        setError('Failed to load course data');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (courseId) {
      loadData();
    }
  }, [courseId]);

  // Navigate to lesson
  const navigateToLesson = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  // Get completed lessons count
  const getCompletedLessonsCount = () => {
    return lessons.filter(lesson => lesson.is_completed).length;
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    if (lessons.length === 0) return 0;
    return Math.round((getCompletedLessonsCount() / lessons.length) * 100);
  };

  // Check if lesson is locked (previous lesson not completed)
  const isLessonLocked = (lessonIndex) => {
    if (lessonIndex === 0) return false; // First lesson is never locked
    return !lessons[lessonIndex - 1]?.is_completed;
  };

  if (isLoading) {
    return (
      <div className="lessons-loading-container">
        <div className="loading-content">
          <motion.div 
            className="loading-robot"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="sparkle-icon" />
          </motion.div>
          <h3>جاري تحميل الدروس...</h3>
          <p>نحضر لك مغامرة تعليمية رائعة!</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modern-lessons-container">
        <div className="modern-error">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/courses')}
            className="back-btn"
          >
            <ArrowLeft size={16} />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Filter lessons based on active tab
  const filteredLessons = lessons.filter(lesson => {
    if (activeTab === 'completed') return lesson.is_completed;
    if (activeTab === 'in-progress') return !lesson.is_completed;
    return true; // 'all' tab
  });

  return (
    <div className="lessons-container">
      <Navbar />
      
      {/* Header with Gradient Background */}
      <div className="lessons-header">
        <div className="container">
          <motion.button 
            onClick={() => navigate('/courses')}
            className="back-button"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={18} />
            <span>العودة للدورات</span>
          </motion.button>
          
          <div className="header-content">
            <motion.div 
              className="header-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1>{course?.title}</h1>
              <p className="course-description">{course?.description}</p>
              
              <div className="course-meta">
                <div className="meta-item">
                  <BookOpen className="meta-icon" size={18} />
                  <span>{lessons.length} دروس</span>
                </div>
                <div className="meta-item">
                  <Award className="meta-icon" size={18} />
                  <span>مستوى {course?.difficulty || 'مبتدئ'}</span>
                </div>
                {currentUser && (
                  <div className="meta-item">
                    <CheckCircle className="meta-icon" size={18} />
                    <span>أكملت {getCompletedLessonsCount()} من {lessons.length}</span>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="progress-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <div className="progress-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle-fill"
                    strokeDasharray={`${getProgressPercentage()}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="22" className="percentage">
                    {getProgressPercentage()}%
                  </text>
                </svg>
              </div>
              <div className="progress-text">
                <h4>تقدمك في الدورة</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <p>{getCompletedLessonsCount()} من {lessons.length} دروس مكتملة</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lessons-main-content">
        <div className="container">
          {/* Tabs */}
          <motion.div 
            className="lessons-tabs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <BookOpen size={18} />
              <span>كل الدروس</span>
              <span className="tab-badge">{lessons.length}</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'in-progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('in-progress')}
            >
              <Zap size={18} />
              <span>قيد التقدم</span>
              <span className="tab-badge">{lessons.filter(l => !l.is_completed).length}</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              <CheckCircle size={18} />
              <span>مكتمل</span>
              <span className="tab-badge">{getCompletedLessonsCount()}</span>
            </button>
          </motion.div>
          
          {/* Lessons Grid */}
          <motion.div 
            className="lessons-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, index) => {
                const isLocked = isLessonLocked(lessons.findIndex(l => l.id === lesson.id));
                const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
                
                return (
                  <motion.div 
                    key={lesson.id}
                    className={`lesson-card ${isLocked ? 'locked' : ''} ${lesson.is_completed ? 'completed' : ''}`}
                    onClick={() => !isLocked && navigateToLesson(lesson.id)}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="lesson-card-inner">
                      <div className="lesson-number">
                        {lessonIndex + 1 < 10 ? `0${lessonIndex + 1}` : lessonIndex + 1}
                      </div>
                      
                      <div className="lesson-content">
                        <div className="lesson-header">
                          <h3 className="lesson-title">
                            {lesson.title}
                            {lesson.is_completed && (
                              <span className="status-badge completed">
                                <CheckCircle size={14} /> مكتمل
                              </span>
                            )}
                            {isLocked && (
                              <span className="status-badge locked">
                                <Lock size={14} /> مقفل
                              </span>
                            )}
                          </h3>
                          
                          {!isLocked && (
                            <button 
                              className="start-lesson-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToLesson(lesson.id);
                              }}
                            >
                              {lesson.is_completed ? 'اعرض مرة أخرى' : 'ابدأ الدرس'}
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                        
                        <p className="lesson-description">
                          {lesson.description || 'تعلم مفاهيم جديدة وتدرب على البرمجة بطريقة ممتعة'}
                        </p>
                        
                        <div className="lesson-footer">
                          <div className="lesson-meta">
                            <span className="meta-item">
                              <Clock size={14} />
                              <span>{lesson.duration || '15'} دقيقة</span>
                            </span>
                            
                            <span className="meta-item">
                              <Star size={14} className="star-icon" />
                              <span>{lesson.points || (index + 1) * 10} نقطة</span>
                            </span>
                            
                            {lesson.is_completed && (
                              <span className="meta-item success">
                                <CheckCircle size={14} />
                                <span>تم الإكمال: {new Date(lesson.completed_at).toLocaleDateString('ar-EG')}</span>
                              </span>
                            )}
                          </div>
                          
                          <div className="lesson-tags">
                            {lesson.tags?.map((tag, i) => (
                              <span key={i} className="tag">{tag}</span>
                            ))}
                            {!lesson.tags?.length && (
                              <span className="tag">جديد</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`lesson-status ${isLocked ? 'locked' : lesson.is_completed ? 'completed' : 'pending'}`}>
                        {isLocked ? (
                          <Lock size={20} />
                        ) : lesson.is_completed ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="empty-illustration">
                  <BookOpen size={48} className="book-icon" />
                  <Sparkles size={24} className="sparkle" />
                </div>
                <h3>لا توجد دروس متاحة حاليًا</h3>
                <p>سيتم إضافة دروس جديدة قريبًا. تابعنا!</p>
                <button 
                  className="back-to-courses"
                  onClick={() => navigate('/courses')}
                >
                  <ArrowLeft size={16} />
                  <span>استكشف دورات أخرى</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      {currentUser && !isLoading && lessons.length > 0 && (
        <motion.div 
          className="floating-action"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const nextLesson = lessons.find(lesson => !lesson.is_completed && !isLessonLocked(lessons.indexOf(lesson)));
            if (nextLesson) {
              navigateToLesson(nextLesson.id);
            } else if (lessons.length > 0) {
              navigateToLesson(lessons[0].id);
            }
          }}
        >
          <Play size={20} />
          <span>{getCompletedLessonsCount() === lessons.length ? 'أعد الدورة' : 'استمر في التعلم'}</span>
        </motion.div>
      )}
      
      {/* Footer */}
      <footer className="lessons-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-message">
              <Sparkles size={18} className="sparkle-icon" />
              <p>أنت على بعد خطوات من إتقان {course?.title}!</p>
            </div>
            <div className="footer-stats">
              <span className="stat">
                <strong>{getCompletedLessonsCount()}</strong> من أصل <strong>{lessons.length}</strong> دروس
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
        >
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <BookOpen size={18} />
            <span>كل الدروس</span>
            <span className="tab-badge">{lessons.length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in-progress')}
          >
            <Zap size={18} />
            <span>قيد التقدم</span>
            <span className="tab-badge">{lessons.filter(l => !l.is_completed).length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <CheckCircle size={18} />
            <span>مكتمل</span>
            <span className="tab-badge">{getCompletedLessonsCount()}</span>
          </button>
        </motion.div>
        
        {/* Lessons Grid */}
        <motion.div 
          className="lessons-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson, index) => {
              const isLocked = isLessonLocked(lessons.findIndex(l => l.id === lesson.id));
              const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
              
              return (
                <motion.div 
                  key={lesson.id}
                  className={`lesson-card ${isLocked ? 'locked' : ''} ${lesson.is_completed ? 'completed' : ''}`}
                  onClick={() => !isLocked && navigateToLesson(lesson.id)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="lesson-card-inner">
                    <div className="lesson-number">
                      {lessonIndex + 1 < 10 ? `0${lessonIndex + 1}` : lessonIndex + 1}
                    </div>
                    
                    <div className="lesson-content">
                      <div className="lesson-header">
                        <h3 className="lesson-title">
                          {lesson.title}
                          {lesson.is_completed && (
                            <span className="status-badge completed">
                              <CheckCircle size={14} /> مكتمل
                            </span>
                          )}
                          {isLocked && (
                            <span className="status-badge locked">
                              <Lock size={14} /> مقفل
                            </span>
                          )}
                        </h3>
                        
                        {!isLocked && (
                          <button 
                            className="start-lesson-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToLesson(lesson.id);
                            }}
                          >
                            {lesson.is_completed ? 'اعرض مرة أخرى' : 'ابدأ الدرس'}
                            <ChevronRight size={16} />
                          </button>
                        )}
                      </div>
                      
                      <p className="lesson-description">
                        {lesson.description || 'تعلم مفاهيم جديدة وتدرب على البرمجة بطريقة ممتعة'}
                      </p>
                      
                      <div className="lesson-footer">
                        <div className="lesson-meta">
                          <span className="meta-item">
                            <Clock size={14} />
                            <span>{lesson.duration || '15'} دقيقة</span>
                          </span>
                          
                          <span className="meta-item">
                            <Star size={14} className="star-icon" />
                            <span>{lesson.points || (index + 1) * 10} نقطة</span>
                          </span>
                          
                          {lesson.is_completed && (
                            <span className="meta-item success">
                              <CheckCircle size={14} />
                              <span>تم الإكمال: {new Date(lesson.completed_at).toLocaleDateString('ar-EG')}</span>
                            </span>
                          )}
                        </div>
                        
                        <div className="lesson-tags">
                          {lesson.tags?.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                          {!lesson.tags?.length && (
                            <span className="tag">جديد</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`lesson-status ${isLocked ? 'locked' : lesson.is_completed ? 'completed' : 'pending'}`}>
                      {isLocked ? (
                        <Lock size={20} />
                      ) : lesson.is_completed ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </div>
                  </div>
                  
                  <p className="lesson-description">
                    {lesson.description || 'تعلم مفاهيم جديدة وتدرب على البرمجة بطريقة ممتعة'}
                  </p>
                  
                  <div className="lesson-footer">
                    <div className="lesson-meta">
                      <span className="meta-item">
                        <Clock size={14} />
                        <span>{lesson.duration || '15'} دقيقة</span>
                      </span>
                      
                      <span className="meta-item">
                        <Star size={14} className="star-icon" />
                        <span>{lesson.points || (index + 1) * 10} نقطة</span>
                      </span>
                      
                      {lesson.is_completed && (
                        <span className="meta-item success">
                          <CheckCircle size={14} />
                          <span>تم الإكمال: {new Date(lesson.completed_at).toLocaleDateString('ar-EG')}</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="lesson-tags">
                      {lesson.tags?.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                      {!lesson.tags?.length && (
                        <span className="tag">جديد</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`lesson-status ${isLocked ? 'locked' : lesson.is_completed ? 'completed' : 'pending'}`}>
                  {isLocked ? (
                    <Lock size={20} />
                  ) : lesson.is_completed ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })
      ) : (
        <motion.div 
          className="floating-action"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const nextLesson = lessons.find(lesson => !lesson.is_completed && !isLessonLocked(lessons.indexOf(lesson)));
            if (nextLesson) {
              navigateToLesson(nextLesson.id);
            } else if (lessons.length > 0) {
              // If all lessons are completed, go to first lesson
              navigateToLesson(lessons[0].id);
            }
          }}
        >
          <Play size={20} />
          <span>{getCompletedLessonsCount() === lessons.length ? 'أعد الدورة' : 'استمر في التعلم'}</span>
        </motion.div>
      )}
      
      {/* Footer */}
      <footer className="lessons-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-message">
              <Sparkles size={18} className="sparkle-icon" />
              <p>أنت على بعد خطوات من إتقان {course?.title}!</p>
            </div>
            <div className="footer-stats">
              <span className="stat">
                <strong>{getCompletedLessonsCount()}</strong> من أصل <strong>{lessons.length}</strong> دروس
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LessonsList;