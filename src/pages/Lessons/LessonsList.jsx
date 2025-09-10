import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import axiosInstance from "../../apis/config";
import Navbar from "../../components/NavBar/Navbar";
import "./lessons.css";
import { useAuth } from "../../context/AuthContext";

const LessonsList = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  // States
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data
  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`courses/${courseId}/`);
      setCourse(response.data);
    } catch (err) {
      console.error("Error fetching course:", err);
      if (err.response?.status === 404) {
        setError(`Course with ID ${courseId} not found`);
      } else if (err.response?.status === 401) {
        setError("Please login to access this course");
      } else {
        setError("Failed to load course details");
      }
    }
  };

  // Fetch lessons for the course
  const fetchLessons = async () => {
    try {
      const response = await axiosInstance.get("lessons/");
      const courseLessons = response.data.filter(
        (lesson) => lesson.course === parseInt(courseId)
      );
      setLessons(courseLessons.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error("Error fetching lessons:", err);
      setError("Failed to load lessons");
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
        setError("Failed to load course data");
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
    return lessons.filter((lesson) => lesson.is_completed).length;
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
      <div className="modern-lessons-container">
        <div className="modern-loading">
          <div className="loading-spinner">📚</div>
          <div>Loading lessons...</div>
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
          <button onClick={() => navigate("/courses")} className="back-btn">
            <ArrowLeft size={16} />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-lessons-container">
      <Navbar />

      {/* Back Button */}
      <button onClick={() => navigate("/courses")} className="back-button">
        <ArrowLeft size={16} />
        Back to Courses
      </button>

      {/* Course Info Header */}
      <div
        className="course-info-header"
        style={{
          backgroundImage: `url(${course?.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5);" }}
        ></div>
        <div className="course-details position-relative">
          <h1
            className="course-title"
            style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            {course?.title}
          </h1>
          <p
            className="course-description"
            style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            {course?.description}
          </p>
          <div className="course-meta">
            <div className="meta-item">
              <BookOpen className="meta-icon" size={16} />
              <span>{lessons.length} Lessons</span>
            </div>
            <div className="meta-item">
              <CheckCircle className="meta-icon" size={16} />
              <span>{getCompletedLessonsCount()} Completed</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section position-relative">
          <div className="progress-circle">
            <svg className="circular-chart" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${getProgressPercentage()}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {getProgressPercentage()}%
              </text>
            </svg>
          </div>
          <div className="progress-text">
            <div
              className="completed-count"
              style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)" }}
            >
              {getCompletedLessonsCount()}/{lessons.length}
            </div>
            <div>Lessons Completed</div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="lessons-section">
        <div className="lessons-title">
          <BookOpen className="title-icon" size={24} />
          <span>Course Lessons</span>
        </div>

        {lessons.length > 0 ? (
          <div className="lessons-grid">
            {lessons.map((lesson, index) => {
              const isLocked = isLessonLocked(index);

              return (
                <div
                  key={lesson.id}
                  className={`lesson-card ${
                    lesson.is_completed ? "completed" : ""
                  } ${isLocked ? "locked" : ""}`}
                  onClick={() => !isLocked && navigateToLesson(lesson.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="lesson-number">
                    {lesson.is_completed ? (
                      <CheckCircle className="check-icon" size={24} />
                    ) : isLocked ? (
                      <Lock className="lock-icon" size={24} />
                    ) : (
                      <span>{lesson.order}</span>
                    )}
                  </div>

                  <div className="lesson-content">
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <p className="lesson-description">{lesson.description}</p>
                    <div className="lesson-meta">
                      <div className="duration">
                        <Clock className="duration-icon" size={14} />
                        <span>{lesson.duration_minutes} min</span>
                      </div>
                      {lesson.is_completed && (
                        <div className="completed-badge">
                          <CheckCircle className="star-icon" size={14} />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lesson-action">
                    {isLocked ? (
                      <div className="locked-message">
                        Complete previous lesson
                      </div>
                    ) : (
                      <div className="action-button start">
                        {lesson.is_completed ? "Review" : "Start"}
                      </div>
                    )}
                    {!isLocked && (
                      <ChevronRight className="chevron-icon" size={20} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-lessons">
            <div className="no-lessons-icon">📚</div>
            <h3>No Lessons Available</h3>
            <p>This course doesn't have any lessons yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsList;