import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import { FaUsers, FaChild, FaUserTie, FaBook, FaChalkboardTeacher } from "react-icons/fa";
import "./AdminStatistics.css";

export default function AdminStatistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("admin/statistics/")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching statistics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="admin-stats-container">⏳ Loading statistics...</div>;
  if (!stats) return <div className="admin-stats-container">⚠️ Failed to load data</div>;

  // Data
  const userData = [
    { name: "Parents", value: stats.total_parents },
    { name: "Kids", value: stats.total_kids },
  ];
  const COLORS = ["#ef476f", "#06d6a0"];

  const courseLessonData = [
    { name: "Courses", value: stats.total_courses },
    { name: "Lessons", value: stats.total_lessons },
  ];

  return (
    <div className="admin-stats-container">
      <h2 className="page-title">📊 Platform Statistics</h2>

      {/* Cards */}
      <div className="stats-cards">
        <div className="stat-card card-users">
          <FaUsers className="icon" />
          <h5>Total Users</h5>
          <h3>{stats.total_users}</h3>
        </div>
        <div className="stat-card card-parents">
          <FaUserTie className="icon" />
          <h5>Parents</h5>
          <h3>{stats.total_parents}</h3>
        </div>
        <div className="stat-card card-kids">
          <FaChild className="icon" />
          <h5>Kids</h5>
          <h3>{stats.total_kids}</h3>
        </div>
        <div className="stat-card card-courses">
          <FaBook className="icon" />
          <h5>Courses</h5>
          <h3>{stats.total_courses}</h3>
        </div>
        <div className="stat-card card-lessons">
          <FaChalkboardTeacher className="icon" />
          <h5>Lessons</h5>
          <h3>{stats.total_lessons}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        {/* Pie Chart */}
        <div className="chart-card">
          <h4>👨‍👩‍👧 User Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={userData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                {userData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-card">
          <h4>📚 Courses vs Lessons</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseLessonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1b6ca8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Courses */}
        <div className="chart-card">
          <h4>🔥 Top Courses</h4>
          <ul className="list">
            {stats.top_courses.map((c, i) => (
              <li key={i}>{c.title} - {c.enrollments} enrollments</li>
            ))}
          </ul>
        </div>

        {/* Top Kids */}
        <div className="chart-card">
          <h4>⭐ Top Active Kids</h4>
          <ul className="list">
            {stats.top_kids.map((k, i) => (
              <li key={i}>{k.username} - {k.completed_lessons} lessons</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
