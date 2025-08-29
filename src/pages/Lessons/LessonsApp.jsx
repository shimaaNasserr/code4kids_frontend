import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, CheckCircle, FileText, Clock, ChevronRight, Trophy, Lightbulb, Zap, Award, Star, Sparkles, Check, X, AlertTriangle, HelpCircle } from 'lucide-react';
import axiosInstance from '../../apis/config';
import Navbar from '../../components/NavBar/Navbar';
import './LessonsApp.css';

// Mock data for gamification
const initialBadges = [
  { id: 1, name: 'First Steps', earned: true, icon: '1️⃣' },
  { id: 2, name: 'Code Wizard', earned: true, icon: '🧙' },
  { id: 3, name: 'Bug Hunter', earned: false, icon: '🐛' },
  { id: 4, name: 'Syntax Master', earned: false, icon: '✨' },
];

const mascotMessages = [
  "Great job! You're a coding superstar! ⭐",
  "Keep going! You're learning so much! 🚀",
  "Wow! You're really getting the hang of this! 🌟",
  "Amazing work! Let's tackle the next challenge! 💪",
  "You're doing fantastic! Keep it up! 🎯"
];

const hintMessages = [
  "Check if you've closed all your brackets and parentheses.",
  "Remember to use the correct variable names from the instructions.",
  "Try breaking the problem down into smaller steps.",
  "Look at the error message for clues about what might be wrong."
];

const LessonsApp = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login'); // يوديني صفحة اللوجين
    }
  }, [navigate]);
  
  // Lesson states
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [otherLessons, setOtherLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI states
  const [activeTab, setActiveTab] = useState('lesson');
  const [code, setCode] = useState('// Write your code here\nconsole.log(\'Hello, Coder!\');');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [points, setPoints] = useState(150);
  const [showMascotMessage, setShowMascotMessage] = useState(false);
  const [badges, setBadges] = useState(initialBadges);
  const [isHintExpanded, setIsHintExpanded] = useState(false);
  
  // Refs
  const mascotTimeout = useRef(null);
  const previewRef = useRef(null);
  const codeEditorRef = useRef(null);

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
      
      // Show mascot message and award points
      showRandomMascotMessage();
      setPoints(prev => prev + 10);
      
      // Check for achievements
      checkForAchievements();
      
    } catch (err) {
      setOutput(`Error: ${err.message}`);
      setFeedback({ 
        type: 'error', 
        message: 'Oops! There was an error in your code. Try again!' 
      });
    }
  };

  // Check for achievements
  const checkForAchievements = () => {
    // Example: Award "Code Wizard" badge after 3 successful runs
    const successfulRuns = points / 10; // Simplified example
    if (successfulRuns >= 3) {
      const updatedBadges = [...badges];
      const codeWizardBadge = updatedBadges.find(b => b.id === 2);
      if (codeWizardBadge && !codeWizardBadge.earned) {
        codeWizardBadge.earned = true;
        setBadges(updatedBadges);
        setFeedback({
          type: 'success',
          message: '🏆 Achievement Unlocked: Code Wizard!'
        });
      }
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
      let response;
      try {
        response = await axiosInstance.get(`lessons/${lessonId}/assignments/`);
      } catch (err1) {
        try {
          response = await axiosInstance.get('assignments/');
          response.data = response.data.filter(
            assignment => assignment.lesson === parseInt(lessonId)
          );
        } catch (err2) {
          console.warn('Assignments endpoint not available, using empty array');
          setAssignments([]);
          return;
        }
      }
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

  // Get submission for a specific assignment
  const getSubmissionForAssignment = (assignmentId) => {
    return submissions.find(sub => sub.assignment === assignmentId);
  };

  // Handle lesson completion
  const handleLessonComplete = async () => {
    try {
      let response;
      try {
        response = await axiosInstance.put(`lessons/${lessonId}/`, {
          ...lesson,
          is_completed: true
        });
      } catch (putError) {
        try {
          response = await axiosInstance.post(`lessons/${lessonId}/complete/`);
        } catch (postError) {
          console.warn('API update failed, updating locally only');
          setLesson(prev => ({ ...prev, is_completed: true }));
          return;
        }
      }
      setLesson(prev => ({ ...prev, is_completed: true }));
    } catch (err) {
      console.error('Error marking lesson as complete:', err);
      setLesson(prev => ({ ...prev, is_completed: true }));
    }
  };

  // Navigate to a different lesson
  const navigateToLesson = (newLessonId) => {
    navigate(`/courses/${courseId}/lessons/${newLessonId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="modern-lessons-container">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="modern-lessons-container">
        <Navbar />
        <div className="error-container">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => navigate(`/courses`)}
            className="btn btn-primary"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="lessons-app-container mt-5 py-5">
      
      {/* Left Panel - Instructions & Code */}
      <div className="lessons-panel">
        <div className="lesson-header">
          <h1 className="lesson-title">{lesson?.title || 'Loading...'}</h1>
          <p className="lesson-description">
            {lesson?.description || 'Loading lesson description...'}
          </p>
        </div>

        {/* Tabs */}
        <div className="lesson-tabs">
          <button
            className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`}
            onClick={() => setActiveTab('lesson')}
          >
            <Play size={16} /> Lesson
          </button>
          <button
            className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <FileText size={16} /> Assignments ({assignments.length})
          </button>
        </div>

        {/* Lesson Content */}
        {activeTab === 'lesson' ? (
          <>
            {/* Video or Content */}
            {lesson?.video_url ? (
              <div className="video-container">
                <div className="video-wrapper">
                  <iframe
                    src={lesson.video_url}
                    title="Lesson Video"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-info">
                  <Clock size={14} /> {lesson.duration_minutes || '10'} minutes
                </div>
              </div>
            ) : (
              <div className="content-container">
                <div className="content-text">
                  {lesson?.content || 'No content available for this lesson.'}
                </div>
              </div>
            )}

            {/* Code Editor */}
            <div className="code-editor-container">
              <div className="editor-header">
                <span className="editor-filename">code.js</span>
                <div className="editor-actions">
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => setCode('// Write your code here\nconsole.log(\'Hello, Coder!\');')}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <textarea
                ref={codeEditorRef}
                className="code-editor"
                value={code}
                onChange={handleCodeChange}
                spellCheck="false"
              />
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="btn btn-primary"
                onClick={handleRunCode}
              >
                <Zap size={16} /> Run Code
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleShowHint}
              >
                <Lightbulb size={16} /> {showHint ? 'Next Hint' : 'Get Hint'}
              </button>
            </div>

            {/* Hint System */}
            {showHint && (
              <div className="hint-container">
                <div 
                  className="hint-header"
                  onClick={() => setIsHintExpanded(!isHintExpanded)}
                >
                  <span>💡 Hint {currentHintIndex + 1}/{hintMessages.length}</span>
                  <span>{isHintExpanded ? '▲' : '▼'}</span>
                </div>
                {isHintExpanded && (
                  <div className="hint-content">
                    <p>{hintMessages[currentHintIndex]}</p>
                  </div>
                )}
              </div>
            )}

            {/* Feedback Message */}
            {feedback.message && (
              <div className={`feedback-message feedback-${feedback.type}`}>
                {feedback.type === 'success' ? (
                  <Check className="feedback-icon" />
                ) : (
                  <X className="feedback-icon" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Complete Lesson Button */}
            <div className="completion-section">
              {!lesson?.is_completed ? (
                <button
                  onClick={handleLessonComplete}
                  className="btn btn-primary"
                >
                  <CheckCircle size={20} /> Complete Lesson
                </button>
              ) : (
                <div className="completed-message">
                  <CheckCircle size={20} /> Lesson Completed! ✨
                </div>
              )}
            </div>
          </>
        ) : (
          /* Assignments Tab */
          <div className="assignments-container">
            <h3 className="assignments-title">Assignments</h3>
            {assignments.length > 0 ? (
              assignments.map((assignment) => {
                const submission = getSubmissionForAssignment(assignment.id);
                return (
                  <div key={assignment.id} className="assignment-card">
                    <div className="assignment-header">
                      <h4 className="assignment-title">{assignment.title}</h4>
                      {submission ? (
                        submission.grade !== null && submission.grade !== undefined ? (
                          <span className="status-badge success">
                            <Trophy size={14} /> {submission.grade}/100
                          </span>
                        ) : (
                          <span className="status-badge warning">
                            <Clock size={14} /> Under Review
                          </span>
                        )
                      ) : (
                        <span className="status-badge default">
                          <Clock size={14} /> Not Submitted
                        </span>
                      )}
                    </div>
                    <p className="assignment-question">{assignment.question}</p>
                    <div className="assignment-footer">
                      <span className="assignment-due">
                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          // Handle assignment submission
                          alert('Assignment submission would open here');
                        }}
                      >
                        {submission ? 'View Submission' : 'Submit Work'}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-assignments">
                <p>No assignments for this lesson yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Panel - Preview & Gamification */}
      <div className="preview-panel">
        {/* Gamification Bar */}
        <div className="gamification-bar">
          <div className="points-display">
            <span className="points-icon">✨</span>
            <span>{points} XP</span>
          </div>
          <div className="badges-container">
            {badges.map(badge => (
              <div 
                key={badge.id} 
                className={`badge-icon ${badge.earned ? 'earned' : ''}`}
                title={badge.name}
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Preview Content */}
        <div className="preview-container">
          <div className="preview-header">
            <h3 className="preview-title">Output</h3>
          </div>
          <div className="preview-content" ref={previewRef}>
            {output || 'Your output will appear here when you run your code.'}
          </div>
        </div>

        {/* Mascot */}
        <div 
          className="mascot bounce"
          onClick={showRandomMascotMessage}
        >
          <img 
            src="/mascot.png" 
            alt="Coding Mascot" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-laptop-3025716-2526907.png';
            }}
          />
        </div>

        {/* Mascot Message */}
        {showMascotMessage && (
          <div className="mascot-message">
            {mascotMessages[Math.floor(Math.random() * mascotMessages.length)]}
          </div>
        )}

        {/* Other Lessons */}
        <div className="other-lessons">
          <h4>More Lessons</h4>
          <div className="lessons-list">
            {otherLessons
              .filter(l => l.id !== parseInt(lessonId))
              .slice(0, 3)
              .map(lesson => (
                <div 
                  key={lesson.id}
                  className="lesson-item"
                  onClick={() => navigateToLesson(lesson.id)}
                >
                  <div className="lesson-icon">
                    {lesson.is_completed ? '✅' : '📚'}
                  </div>
                  <span className="lesson-title">{lesson.title}</span>
                  <ChevronRight size={14} className="chevron" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsApp;
