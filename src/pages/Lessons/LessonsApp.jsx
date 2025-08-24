import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  FileText, 
  Clock,
  ChevronRight,
  Trophy,
  Calendar
} from 'lucide-react';
import axiosInstance from '../../apis/config';
import Navbar from '../../components/NavBar/Navbar';
import './lessons.css';

const LessonsApp = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  
  // States
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [otherLessons, setOtherLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('lesson');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data
  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`courses/${courseId}/`);
      setCourse(response.data);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course details');
    }
  };

  // Fetch current lesson data
  const fetchLesson = async () => {
    try {
      const response = await axiosInstance.get(`lessons/${lessonId}/`);
      setLesson(response.data);
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError('Failed to load lesson');
    }
  };

  // Fetch all lessons for the course
  const fetchOtherLessons = async () => {
    try {
      const response = await axiosInstance.get('lessons/');
      const courseLessons = response.data.filter(lesson => lesson.course === parseInt(courseId));
      setOtherLessons(courseLessons.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  // Fetch assignments for current lesson
  const fetchAssignments = async () => {
    try {
      // Try different endpoints for assignments
      let response;
      try {
        response = await axiosInstance.get(`lessons/${lessonId}/assignments/`);
      } catch (err1) {
        try {
          response = await axiosInstance.get('assignments/');
          response.data = response.data.filter(assignment => assignment.lesson === parseInt(lessonId));
        } catch (err2) {
          console.warn('Assignments endpoint not available, using empty array');
          setAssignments([]);
          return;
        }
      }
      setAssignments(response.data || []);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setAssignments([]);
    }
  };

  // Fetch user submissions
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

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchCourse(),
          fetchLesson(),
          fetchOtherLessons(),
          fetchAssignments()
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

  // Fetch submissions after assignments are loaded
  useEffect(() => {
    if (assignments.length > 0) {
      fetchSubmissions();
    }
  }, [assignments]);

  // Get submitted assignments count
  const getSubmittedCount = () => {
    return assignments.filter(assignment => 
      submissions.some(sub => sub.assignment === assignment.id)
    ).length;
  };

  // Get graded submissions count
  const getGradedCount = () => {
    return submissions.filter(sub => sub.grade !== null && sub.grade !== undefined).length;
  };

  // Get submission for assignment
  const getSubmissionForAssignment = (assignmentId) => {
    return submissions.find(sub => sub.assignment === assignmentId);
  };

  // Handle lesson completion
  const handleLessonComplete = async () => {
    try {
      // Try PUT method first, then POST if that fails
      let response;
      try {
        response = await axiosInstance.put(`lessons/${lessonId}/`, {
          ...lesson,
          is_completed: true
        });
      } catch (putError) {
        // If PUT fails, try POST to a completion endpoint
        try {
          response = await axiosInstance.post(`lessons/${lessonId}/complete/`);
        } catch (postError) {
          // If both fail, just update locally
          console.warn('API update failed, updating locally only');
          setLesson(prev => ({ ...prev, is_completed: true }));
          return;
        }
      }
      setLesson(prev => ({ ...prev, is_completed: true }));
    } catch (err) {
      console.error('Error marking lesson as complete:', err);
      // Still update locally even if API fails
      setLesson(prev => ({ ...prev, is_completed: true }));
    }
  };

  // Navigate to lesson
  const navigateToLesson = (targetLessonId) => {
    if (targetLessonId !== parseInt(lessonId)) {
      navigate(`/courses/${courseId}/lessons/${targetLessonId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="modern-lessons-container">
        <div className="modern-loading">
          <div className="loading-spinner">📚</div>
          <div>Loading lesson...</div>
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
            onClick={() => navigate(`/courses/${courseId}`)}
            className="back-btn"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="modern-lessons-container">
        <div className="modern-error">
          <h3>📝 Lesson not found</h3>
          <p>The requested lesson could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-lessons-container">
      <Navbar />

      {/* Main Content */}
      <div className="modern-content">
        {/* Left Column - Main Content */}
        <div className="main-column">
          {/* Lesson Header */}
          <div className="lesson-header">
            <h1 className="lesson-title">{lesson.title}</h1>
            <p className="lesson-description">{lesson.description}</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`}
            >
              <Play size={16} />
              Lesson
            </button>
            
            <button
              onClick={() => setActiveTab('assignments')}
              className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
            >
              <FileText size={16} />
              Assignments ({assignments.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'lesson' && (
            <div className="tab-content">
              {/* Video Player */}
              {lesson.video_url && (
                <div className="video-container">
                  <div className="video-wrapper">
                    <iframe
                      src={lesson.video_url}
                      className="video-iframe"
                      allowFullScreen
                      title="Lesson Video"
                    />
                  </div>
                  
                  <div className="video-info">
                    <Clock size={14} />
                    {lesson.duration_minutes} minutes
                  </div>
                </div>
              )}

              {/* Lesson Content */}
              <div className="content-container">
                <div className="content-text">
                  {lesson.content || 'No content available for this lesson.'}
                </div>
              </div>

              {/* Complete Lesson Button */}
              <div className="completion-section">
                {!lesson.is_completed ? (
                  <button
                    onClick={handleLessonComplete}
                    className="complete-btn"
                  >
                    <CheckCircle size={20} />
                    Complete Lesson
                  </button>
                ) : (
                  <div className="completed-message">
                    <CheckCircle size={20} />
                    Lesson Completed! ✨
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="tab-content">
              {assignments.length > 0 ? (
                assignments.map((assignment) => {
                  const submission = getSubmissionForAssignment(assignment.id);
                  
                  return (
                    <div key={assignment.id} className="assignment-card">
                      <div className="assignment-header">
                        <div className="assignment-info">
                          <h3 className="assignment-title">
                            Assignment #{assignment.id}
                          </h3>
                          <p className="assignment-question">
                            {assignment.question}
                          </p>
                          <div className="assignment-date">
                            <Calendar size={14} />
                            {new Date(assignment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="status-section">
                          {submission ? (
                            submission.grade !== null && submission.grade !== undefined ? (
                              <div className="status-badge graded">
                                <Trophy size={14} />
                                {submission.grade}/100
                              </div>
                            ) : (
                              <div className="status-badge review">
                                <Clock size={14} />
                                Under Review
                              </div>
                            )
                          ) : (
                            <div className="status-badge not-submitted">
                              <Clock size={14} />
                              Not Submitted
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Show submission if exists */}
                      {submission && (
                        <div className="submission-display">
                          <h4 className="submission-title">Your Submission:</h4>
                          <div className="submission-content">
                            {submission.text && (
                              <pre className="submission-code">{submission.text}</pre>
                            )}
                            {submission.file && (
                              <div className="submission-file">
                                📎 File: {submission.file}
                              </div>
                            )}
                            {submission.link && (
                              <div className="submission-link">
                                🔗 Link: <a href={submission.link} target="_blank" rel="noopener noreferrer">
                                  {submission.link}
                                </a>
                              </div>
                            )}
                          </div>
                          
                          {submission.grade !== null && submission.grade !== undefined && submission.feedback && (
                            <div className="feedback-section">
                              <h5>Teacher's Feedback:</h5>
                              <p>{submission.feedback}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="no-assignments">
                  <div className="no-assignments-icon">📝</div>
                  <h3>No Assignments</h3>
                  <p>This lesson doesn't have any assignments yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="sidebar">
          {/* Lesson Progress */}
          <div className="progress-card">
            <h3 className="card-title">Lesson Progress</h3>
            
            <div className="progress-items">
              <div className="progress-item">
                <span className="progress-label">Lesson Completion</span>
                <span className={`progress-value ${lesson.is_completed ? 'completed' : 'not-completed'}`}>
                  {lesson.is_completed ? 'Completed' : 'Not Completed'}
                </span>
              </div>
              
              <div className="progress-item">
                <span className="progress-label">Assignments Submitted</span>
                <span className="progress-value">
                  {getSubmittedCount()}/{assignments.length}
                </span>
              </div>
              
              <div className="progress-item">
                <span className="progress-label">Graded</span>
                <span className="progress-value">
                  {getGradedCount()}/{assignments.length}
                </span>
              </div>
              
              <div className="progress-item">
                <span className="progress-label">Duration</span>
                <span className="progress-value">
                  {lesson.duration_minutes} minutes
                </span>
              </div>
            </div>
          </div>

          {/* Other Lessons */}
          <div className="lessons-card">
            <h3 className="card-title">Other Lessons</h3>
            
            <div className="lessons-list">
              {otherLessons.map((lessonItem) => (
                <div
                  key={lessonItem.id}
                  onClick={() => navigateToLesson(lessonItem.id)}
                  className={`lesson-item ${
                    lessonItem.id === lesson.id ? 'current' : 
                    lessonItem.is_completed ? 'completed' : 'available'
                  }`}
                >
                  <div className="lesson-icon">
                    {lessonItem.is_completed ? (
                      <CheckCircle size={16} />
                    ) : lessonItem.id === lesson.id ? (
                      <Play size={16} />
                    ) : (
                      <div className="lesson-number">{lessonItem.order}</div>
                    )}
                  </div>
                  
                  <span className="lesson-name">{lessonItem.title}</span>
                  
                  {lessonItem.id !== lesson.id && (
                    <ChevronRight size={14} className="chevron-icon" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsApp;