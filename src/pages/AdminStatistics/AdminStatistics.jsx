import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { FaUsers, FaChild, FaUserTie, FaBook, FaChalkboardTeacher, FaUserGraduate, FaChartLine } from "react-icons/fa";
import "./AdminStatistics.css";

export default function AdminStatistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get("admin/statistics/")
      .then(res => {
        setStats(res.data);
        setFilteredUsers(res.data.top_kids.concat(res.data.top_parents || []));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching statistics:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (!stats) return;

    const allUsers = stats.top_kids.concat(stats.top_parents || []);
    const results = allUsers.filter(u =>
      u.username?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(results);
  };

  if (loading) return <div className="admin-stats-container">⏳ Loading statistics...</div>;
  if (!stats) return <div className="admin-stats-container">⚠️ Failed to load data</div>;

  const userData = [
    { name: "Parents", value: stats.total_parents },
    { name: "Kids", value: stats.total_kids },
    { name: "Active Kids (5 days)", value: stats.active_kids_last_5_days },
  ];
  const COLORS = ["#ef476f", "#ffd166", "#06d6a0"];

  // Example: Courses vs Months (dummy data if backend not yet provides it)
  const coursesVsMonthsData = stats.courses_vs_months || [
    { name: "Jan", "Course A": 5, "Course B": 3, "Course C": 7 },
    { name: "Feb", "Course A": 8, "Course B": 2, "Course C": 6 },
    { name: "Mar", "Course A": 10, "Course B": 5, "Course C": 8 },
  ];

  return (
    <div className="admin-stats-container">
      <h2 className="page-title">📊 Admin Dashboard</h2>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search user by username..."
          value={searchInput}
          onChange={handleSearch}
        />
      </div>

      {/* Stats Cards */}
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
        <div className="stat-card card-active-kids">
          <FaChild className="icon" />
          <h5>Active Kids (5 days)</h5>
          <h3>{stats.active_kids_last_5_days}</h3>
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
        {/* Users Pie Chart */}
        <div className="chart-card full-width">
          <h4>👨‍👩‍👧 Users Distribution</h4>
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

        {/* Top Courses & Top Active Users */}
        <div className="chart-row">
          <div className="chart-card half-width">
            <h4><FaChartLine /> Top Courses</h4>
            <ul className="list">
              {stats.top_courses.map((c, i) => (
                <li key={i}>{c.title} - {c.completions_count} completions</li>
              ))}
            </ul>
          </div>
          <div className="chart-card half-width">
            <h4><FaUserGraduate /> Top Active Users</h4>
            <ul className="list">
              {(searchInput ? filteredUsers : stats.top_kids).map((u, i) => (
                <li key={i}>{u.username} - {u.completed_lessons_count || 0} lessons</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Courses vs Months Bar Chart */}
        <div className="chart-card full-width">
          <h4>📊 Courses vs Months</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursesVsMonthsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {/* Dynamically add a Bar for each course */}
              {Object.keys(coursesVsMonthsData[0] || {})
                .filter(k => k !== "name")
                .map((course, i) => (
                  <Bar key={i} dataKey={course} fill={["#06d6a0","#ef476f","#ffd166"][i % 3]} />
                ))
              }
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
