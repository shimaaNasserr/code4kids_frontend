// src/pages/Dashboard/ChildDashboardForParent.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import axiosInstance from "../../apis/config";
import "./Dashboard.css";
import { motion } from "framer-motion";

const ChildDashboardForParent = () => {
  const { kidId } = useParams();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kidInfo, setKidInfo] = useState(null);
  const navigate = useNavigate();
  const clickSound = new Audio("/sounds/click.mp3");

  useEffect(() => {
    const fetchChildProgress = async () => {
      try {
        const res = await axiosInstance.get("/progress/parent-dashboard/");
        const child = res.data.children.find((c) => c.id === Number(kidId));
        if (!child) throw new Error("Child not found");
        setKidInfo({ id: child.id, name: child.name, avatar: child.avatar });
        setProgressData(child.progress || []);
        console.log("Child Dashboard Response:", child);
      } catch (err) {
        setError("Failed to load child progress data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChildProgress();
  }, [kidId]);

  if (loading) return <div className="dashboard-loading">⏳ Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  const total = progressData.length;
  const completedList = progressData.filter((c) => Number(c.progress_percentage) === 100);
  const inProgressList = progressData.filter((c) => Number(c.progress_percentage) > 0 && Number(c.progress_percentage) < 100);

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
            <img src={c.image_url} alt={c.title} className="course-image" onError={(e) => (e.target.style.display = "none")} />
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
          
        </div>
      </motion.div>
    );
  };

  return (
    <div className="dashboard-container">
      {kidInfo && (
        <div className="kid-header">
          <h2 className="text-gradient">{kidInfo.name}'s Dashboard</h2>
          <div className="kid-avatar-container">
            {kidInfo.avatar ? (
              <img src={kidInfo.avatar} alt={kidInfo.name} className="kid-avatar-img" />
            ) : (
              <div className="kid-avatar-fallback">
                <FaUserGraduate className="kid-avatar-icon" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card stat-total">📚<p>Total</p><h4>{total}</h4></div>
        <div className="stat-card stat-completed">🏆<p>Completed</p><h4>{completedList.length}</h4></div>
        <div className="stat-card stat-progress">🚀<p>In Progress</p><h4>{inProgressList.length}</h4></div>
      </div>

      {/* In Progress */}
      <div className="section-block">
        <h3 className="section-title gradient-text">🚀 In Progress</h3>
        {inProgressList.length === 0 ? (
          <div className="empty-strip">No courses in progress… start a course now!</div>
        ) : (
          <div className="courses-grid">{inProgressList.map(renderCourseCard)}</div>
        )}
      </div>

      {/* Completed */}
      <div className="section-block">
        <h3 className="section-title gradient-text">🏆 Completed</h3>
        {completedList.length === 0 ? (
          <div className="empty-strip">No completed courses yet 👏</div>
        ) : (
          <div className="courses-grid">{completedList.map(renderCourseCard)}</div>
        )}
      </div>
    </div>
  );
};

export default ChildDashboardForParent;
