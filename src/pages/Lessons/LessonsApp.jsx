import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle,
  FileText, 
  Clock, 
  ChevronRight, 
  Trophy, 
  Lightbulb, 
  Zap, 
  Star, 
  Sparkles, 
  Check, 
  X, 
  AlertTriangle, 
  HelpCircle,
  Upload,
  Download,
  Award,
  Target,
  BookOpen,
  Users,
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Lock,
  Unlock,
  Heart,
  Flame,
  Gem,
  Map,
  MessageCircle,
  Settings,
  Volume2,
  Bookmark,
  Share2,
  ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../apis/config';
import Navbar from '../../components/NavBar/Navbar';
import { useAuth } from '../../context/AuthContext';
import './lessons.css';
import './adventure-dashboard.css';
import './progress-styles.css';
import './assignments-styles.css';

const LessonsApp = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, token, isLoading: authLoading } = useAuth();
  
  // Authentication check
  useEffect(() => {
    if (!authLoading && (!user || !token)) {
      navigate('/login');
    }
  }, [user, token, authLoading, navigate]);
  
  // Main states
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [otherLessons, setOtherLessons] = useState([]);
  const [lessonCompletion, setLessonCompletion] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI states
  const [activeTab, setActiveTab] = useState('description');
  const [code, setCode] = useState('// Write your code here\nconsole.log(\'Hello, Coder!\');');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showMascotMessage, setShowMascotMessage] = useState(false);
  const [isHintExpanded, setIsHintExpanded] = useState(false);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs
  const mascotTimeout = useRef(null);
  const previewRef = useRef(null);
  const codeEditorRef = useRef(null);
  const fileInputRef = useRef(null);

  // Hint messages based on lesson content
  const hintMessages = [
    "Check if you've closed all your brackets and parentheses.",
    "Remember to use the correct variable names from the instructions.",
    "Try breaking the problem down into smaller steps.",
    "Look at the error message for clues about what might be wrong.",
    "Make sure you're using the right data types.",
    "Check your spelling and syntax carefully."
  ];

  // Mascot messages for encouragement
  const mascotMessages = [
    "Great job! You're a coding superstar! ⭐",
    "Keep going! You're learning so much! 🚀",
    "Wow! You're really getting the hang of this! 🌟",
    "Amazing work! Let's tackle the next challenge! 💪",
    "You're doing fantastic! Keep it up! 🎯",
    "Excellent! You're becoming a coding wizard! 🧙‍♂️"
  ];

  // Show random mascot message
  const showRandomMascotMessage = () => {
    setShowMascotMessage(true);
    
    if (mascotTimeout.current) {
      clearTimeout(mascotTimeout.current);
    }
    
    mascotTimeout.current = setTimeout(() => {
      setShowMascotMessage(false);
    }, 5000);
  };

  // Fetch lesson data
  const fetchLesson = async () => {
    try {
      const response = await axiosInstance.get(`lessons/${lessonId}/`);
      setLesson(response.data);
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError('Failed to load lesson data');
    }
  };

  // Fetch course data
  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`courses/${courseId}/`);
      setCourse(response.data);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course data');
    }
  };

  // Fetch other lessons in the course
  const fetchOtherLessons = async () => {
    try {
      const response = await axiosInstance.get('lessons/');
      const courseLessons = response.data.filter(
        lesson => lesson.course === parseInt(courseId)
      );
      setOtherLessons(courseLessons.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  // Fetch assignments for current lesson
  const fetchAssignments = async () => {
    try {
      const response = await axiosInstance.get(`lessons/${lessonId}/assignments/`);
      setAssignments(response.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setAssignments([]);
    }
  };

  // Fetch submissions for assignments
  const fetchSubmissions = async () => {
    try {
      const response = await axiosInstance.get('submissions/');
      const userSubmissions = response.data.filter(submission => 
        assignments.some(assignment => assignment.id === submission.assignment)
      );
      setSubmissions(userSubmissions);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setSubmissions([]);
    }
  };

  // Fetch lesson completion status
  const fetchLessonCompletion = async () => {
    try {
      const response = await axiosInstance.get(`lessons/${lessonId}/completion/`);
      setLessonCompletion(response.data);
    } catch (err) {
      console.log('No completion data found');
      setLessonCompletion(null);
    }
  };

  // Fetch progress data
  const fetchProgress = async () => {
    try {
      const response = await axiosInstance.get(`progress/child-dashboard/`);
      const courseProgress = response.data.find(p => p.course === parseInt(courseId));
      setProgress(courseProgress);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  // Load all data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchCourse(),
          fetchLesson(),
          fetchOtherLessons(),
          fetchAssignments(),
          fetchLessonCompletion(),
          fetchProgress(),
        ]);
      } catch (err) {
        setError('Failed to load lesson data');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId && lessonId) {
      loadData();
    }
  }, [courseId, lessonId]);

  // Fetch submissions when assignments change
  useEffect(() => {
    if (assignments.length > 0) {
      fetchSubmissions();
    }
  }, [assignments]);

  // Handle running code
  const handleRunCode = () => {
    try {
      const originalConsoleLog = console.log;
      let outputText = '';
      
      // Override console.log to capture output
      console.log = (...args) => {
        outputText += args.join(' ') + '\n';
      };
      
      // Execute the code
      // Note: In production, use a safer method like a Web Worker or sandboxed iframe
      // eslint-disable-next-line no-eval
      eval(code);
      
      // Restore original console.log
      console.log = originalConsoleLog;
      
      // Update output and show success feedback
      setOutput(outputText || 'Code executed successfully!');
      setFeedback({ 
        type: 'success', 
        message: 'Great job! Your code ran successfully!' 
      });
      
      // Show mascot message
      showRandomMascotMessage();
      
    } catch (err) {
      setOutput(`Error: ${err.message}`);
      setFeedback({ 
        type: 'error', 
        message: 'Oops! There was an error in your code. Try again!' 
      });
    }
  };

  // Handle showing next hint
  const handleShowHint = () => {
    if (!showHint) {
      setShowHint(true);
      return;
    }
    
    if (currentHintIndex < hintMessages.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    } else {
      setCurrentHintIndex(0);
    }
  };

  // Handle code change
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Handle lesson completion
  const handleLessonComplete = async () => {
    try {
      const response = await axiosInstance.post(`lessons/${lessonId}/complete/`, {
        time_spent_minutes: 10, // You can calculate this based on actual time
        notes: 'Completed successfully'
      });
      
      setLessonCompletion(response.data);
      setFeedback({
        type: 'success',
        message: '🎉 Congratulations! Lesson completed successfully!'
      });
      
      showRandomMascotMessage();
      
      // Refresh progress data
      fetchProgress();
      
    } catch (err) {
      console.error('Error marking lesson as complete:', err);
      setFeedback({
        type: 'error',
        message: 'Failed to mark lesson as complete. Please try again.'
      });
    }
  };

  // Handle assignment submission
  const handleAssignmentSubmit = async (assignmentId) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('assignment', assignmentId);
      formData.append('student', user.id);
      
      if (submissionText) {
        formData.append('text', submissionText);
      }
      
      if (submissionFile) {
        formData.append('file', submissionFile);
      }
      
      const response = await axiosInstance.post('submissions/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setFeedback({
        type: 'success',
        message: 'Assignment submitted successfully! 🎉'
      });
      
      // Refresh submissions
      fetchSubmissions();
      
      // Clear form
      setSubmissionText('');
      setSubmissionFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (err) {
      console.error('Error submitting assignment:', err);
      setFeedback({
        type: 'error',
        message: 'Failed to submit assignment. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to a different lesson
  const navigateToLesson = (newLessonId) => {
    navigate(`/courses/${courseId}/lessons/${newLessonId}`);
  };

  // Get submission for a specific assignment
  const getSubmissionForAssignment = (assignmentId) => {
    return submissions.find(sub => sub.assignment === assignmentId);
  };

  // Check if lesson is locked (previous lesson not completed)
  const isLessonLocked = (lessonIndex) => {
    if (lessonIndex === 0) return false;
    return !otherLessons[lessonIndex - 1]?.is_completed;
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    if (!progress) return 0;
    return Math.round(progress.progress_percentage || 0);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="lessons-app-container">
        <Navbar />
        <div className="loading-container">
          <motion.div 
            className="spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🎯
          </motion.div>
          <p>Loading amazing lesson...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="lessons-app-container">
        <Navbar />
        <div className="error-container">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => navigate(`/courses`)}
            className="btn btn-primary"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="adventure-learning-dashboard">
      <Navbar />
      

      {/* Three Column Layout */}
      <div className="dashboard-content">
        {/* Left Sidebar - Course Navigation */}
        <div className="left-sidebar">
          {/* Course Map */}
          <div className="course-map-section">
            <h3 className="section-title">
              <Map size={18} />
              Course Map
            </h3>
            <div className="course-map">
              {otherLessons.map((lessonItem, index) => {
                const isLocked = isLessonLocked(index);
                const isCurrentLesson = lessonItem.id === parseInt(lessonId);
                const isCompleted = lessonItem.is_completed;
                return (
                  <div 
                    key={lessonItem.id}
                    className={`map-lesson-node ${
                      isCurrentLesson ? 'current' : 
                      isCompleted ? 'completed' : 
                      isLocked ? 'locked' : 'available'
                    }`}
                    onClick={() => !isLocked && !isCurrentLesson && navigateToLesson(lessonItem.id)}
                  >
                    <div className="node-icon">
                      {isCurrentLesson ? '🎯' : 
                       isCompleted ? '✅' : 
                       isLocked ? '🔒' : '📚'}
                    </div>
                    <div className="node-info">
                      <span className="node-title">{lessonItem.title}</span>
                      <span className="node-order">Lesson {lessonItem.order}</span>
                    </div>
                    {index < otherLessons.length - 1 && <div className="connection-line"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Instructor */}
          <div className="instructor-section">
            <h3 className="section-title">
              <Users size={18} />
              Course Instructor
            </h3>
            <div className="instructor-info">
              {course?.instructors && course.instructors.length > 0 ? (
                course.instructors.map((instructor, index) => (
                  <div key={index} className="instructor-item">
                    <div className="instructor-details">
                      <span className="instructor-name">{instructor.name}</span>
                      <span className="instructor-specialization">{instructor.specialization}</span>
                      <span className="instructor-experience">{instructor.years_of_experience} years experience</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="instructor-placeholder">
                  <div className="instructor-details">
                    <span className="instructor-name">Course Instructor</span>
                    <span className="instructor-specialization">Programming Expert</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Lesson */}
        <div className="main-content">
          {/* Lesson Header */}
          <div className="lesson-header">
            <div className="lesson-breadcrumb">
              <button onClick={() => navigate(`/courses/${courseId}/lessons`)} className="breadcrumb-btn">
                <ArrowLeft size={16} />
                Back to Course
              </button>
              <ChevronRight size={14} />
              <span>Lesson {lesson?.order}</span>
            </div>
            <h1 className="lesson-title">{lesson?.title}</h1>
            <div className="lesson-meta">
              <div className="meta-badge">
                <Clock size={14} />
                {lesson?.duration_minutes || 10} min
              </div>
              <div className="meta-badge">
                <Target size={14} />
                {lesson?.level || 'Beginner'}
              </div>
            </div>
          </div>

          {/* Enhanced Video Player */}
          <div className="enhanced-video-section">
            {lesson?.video_url ? (
              <div className="smart-video-player">
                <div className="video-container">
                  <iframe
                    src={lesson.video_url}
                    title="Lesson Video"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                  <div className="video-controls">
                    <button className="control-btn">
                      <Volume2 size={16} />
                    </button>
                    <button className="control-btn">
                      <Bookmark size={16} />
                    </button>
                    <button className="control-btn">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-stats">
                    <Clock size={16} /> {lesson.duration_minutes || 10} minutes
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-placeholder">
                <BookOpen size={48} />
                <h3>Interactive Content</h3>
                <p>{lesson?.content || 'No content available for this lesson.'}</p>
              </div>
            )}
          </div>

          {/* Interactive Content */}
          <div className="interactive-content">
            <div className="content-tabs">
              <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('description')}>
                Description
              </button>
              <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('notes')}>
                Notes
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-content">
                  <p>{lesson?.description || 'وصف الدرس غير متوفر.'}</p>
                  {lesson?.content && (
                    <div className="detailed-content">
                      <h4>Lesson Content</h4>
                      <div>{lesson.content}</div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'notes' && (
                <div className="notes-content">
                  <textarea 
                    placeholder="Take notes during the lesson..."
                    className="notes-textarea"
                  ></textarea>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Panel - Interactive Features */}
        <div className="right-panel">
          {/* Quick Actions */}
          <div className="quick-actions-panel">
            <h3 className="panel-title">Quick Actions</h3>
            <div className="action-grid">
              <button className="action-card" onClick={handleLessonComplete}>
                {!lessonCompletion ? (
                  <>
                    <CheckCircle size={24} />
                    <span>Complete Lesson</span>
                  </>
                ) : (
                  <>
                    <div className="completion-circle">
                      <div className="completion-dot"></div>
                    </div>
                    <span>Completed!</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Assignments */}
          {assignments && assignments.length > 0 && (
            <div className="assignments-panel">
              <h3 className="panel-title">
                <FileText size={18} />
                Assignments
              </h3>
              <div className="assignments-list">
                {assignments.map((assignment, index) => {
                  const submission = getSubmissionForAssignment(assignment.id);
                  return (
                    <div key={assignment.id} className="assignment-item">
                      <div className="assignment-header">
                        <span className="assignment-title">{assignment.title}</span>
                        {submission ? (
                          <div className="assignment-status completed">
                            <CheckCircle size={16} />
                            <span>Submitted</span>
                          </div>
                        ) : (
                          <div className="assignment-status pending">
                            <Clock size={16} />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                      <p className="assignment-description">{assignment.description}</p>
                      {assignment.due_date && (
                        <div className="assignment-due-date">
                          <Clock size={14} />
                          Due: {new Date(assignment.due_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress Stats */}
          <div className="stats-panel">
            <h3 className="panel-title">Your Progress</h3>
            <div className="progress-summary">
              <div className="progress-text-large">
                {otherLessons.filter(l => l.is_completed).length} / {otherLessons.length} Lessons
              </div>
              <div className="progress-subtitle">
                Keep going! You're doing great!
              </div>
            </div>
          </div>



        </div>
      </div>

      
      {/* Floating Mascot */}
      <div 
        className="floating-mascot"
        onClick={showRandomMascotMessage}
      >
        <img 
          src="/mascot.png" 
          alt="AI Assistant" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-laptop-3025716-2526907.png';
          }}
        />
        <div className="mascot-pulse"></div>
      </div>

      {/* Mascot Message */}
      {showMascotMessage && (
        <AnimatePresence>
          <motion.div 
            className="mascot-message-bubble"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="message-content">
              {mascotMessages[Math.floor(Math.random() * mascotMessages.length)]}
            </div>
            <div className="message-arrow"></div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Feedback Notifications */}
      {feedback.message && (
        <AnimatePresence>
          <motion.div 
            className={`floating-notification notification-${feedback.type}`}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
          >
            <div className="notification-icon">
              {feedback.type === 'success' ? (
                <Check size={20} />
              ) : (
                <X size={20} />
              )}
            </div>
            <span className="notification-text">{feedback.message}</span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default LessonsApp;