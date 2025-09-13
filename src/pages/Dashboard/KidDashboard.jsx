import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/config";
import "./Dashboard.css";
import { motion } from "framer-motion";

const KidDashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const clickSound = new Audio("/sounds/click.mp3");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axiosInstance.get("/progress/child-dashboard/");
        setProgressData(res.data?.progress || []);
      } catch (err) {
        setError("Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading)
    return (
      <div
        className="dashboard-loading"
        style={{ marginTop: "8rem", textAlign: "center" }}
      >
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "50vh", width: "95vw", overflowY: "hidden" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  if (error) return <div className="dashboard-error">{error}</div>;

  const total = progressData.length;
  const completedList = progressData.filter(
    (c) => Number(c.progress_percentage) === 100
  );
  const inProgressList = progressData.filter(
    (c) => Number(c.progress_percentage) < 100
  );

  const renderCourseCard = (item, index) => {
    const c = item.course || {};
    const percent = Math.round(Number(item.progress_percentage) || 0);

    return (
      <motion.div
        key={c.id || index}
        className="course-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => {
          clickSound.play();
          c.id && navigate(`/courses/${c.id}/lessons`);
        }}
      >
        <div className="course-image-container">
          {c.image_url ? (
            <img
              src={c.image_url}
              alt={c.title}
              className="course-image"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="course-icon-fallback">🎨</div>
          )}
        </div>

        <div className="card-body">
          <h5 className="card-title">{c.title || "Course"}</h5>
          <p className="card-text">{(c.description || "").slice(0, 70)}...</p>

          <div className="progress-container">
            <small className="d-flex justify-content-between mb-1">
              <span className="progress-label">{percent}% Completed</span>
            </small>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${percent}%` }}>
                {percent > 0 ? `${percent}%` : ""}
              </div>
            </div>
          </div>

          <button
            className="start-now-button"
            onClick={(e) => {
              e.stopPropagation();
              clickSound.play();
              c.id && navigate(`/courses/${c.id}/lessons`);
            }}
          >
            {percent > 0 && percent < 100
              ? "▶️ Continue"
              : percent === 100
              ? "🏆 Review"
              : "🚀 Start"}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card stat-total">
          📚<p>Total</p>
          <h4>{total}</h4>
        </div>
        <div className="stat-card stat-completed">
          🏆<p>Completed</p>
          <h4>{completedList.length}</h4>
        </div>
        <div className="stat-card stat-progress">
          🚀<p>In Progress</p>
          <h4>{inProgressList.length}</h4>
        </div>
      </div>

      {/* In Progress */}
      <div className="section-block">
        <h3 className="section-title gradient-text">🚀 In Progress</h3>
        {inProgressList.length === 0 ? (
          <div className="empty-strip">
            No courses in progress… start a course now!
          </div>
        ) : (
          <div className="courses-grid">
            {inProgressList.map(renderCourseCard)}
          </div>
        )}
      </div>

      {/* Completed */}
      <div className="section-block">
        <h3 className="section-title gradient-text">🏆 Completed</h3>
        {completedList.length === 0 ? (
          <div className="empty-strip">No completed courses yet 👏</div>
        ) : (
          <div className="courses-grid">
            {completedList.map(renderCourseCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default KidDashboard;
