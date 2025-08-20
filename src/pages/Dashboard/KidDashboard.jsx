import React from "react";
import "./Dashboard.css";

const KidDashboard = () => {
  const courses = [
    { id: 1, title: "Python Basics", status: "completed" },
    { id: 2, title: "Scratch Game Dev", status: "in-progress" },
    { id: 3, title: "Web Development", status: "in-progress" },
    { id: 4, title: "AI for Kids", status: "completed" },
  ];

  const total = courses.length;
  const completed = courses.filter((c) => c.status === "completed").length;
  const inProgress = courses.filter((c) => c.status === "in-progress").length;

  return (
    <div className="dashboard-container container">
      <div className="stats-cards">
        <div className="stat-card">
          <h4>Total Courses</h4>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <p>{completed}</p>
        </div>
        <div className="stat-card">
          <h4>In Progress</h4>
          <p>{inProgress}</p>
        </div>
      </div>

      <div className="courses-section" >
        <h3 className="section-title">In Progress</h3>
        <div className="courses-grid">
          {courses
            .filter((c) => c.status === "in-progress")
            .map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-thumbnail">
                  <i className="fas fa-laptop-code course-icon"></i>
                </div>
                <h3>{course.title}</h3>
                <span className="badge badge-progress">In Progress</span>
              </div>
            ))}
        </div>

        <h3 className="section-title">Completed</h3>
        <div className="courses-grid">
          {courses
            .filter((c) => c.status === "completed")
            .map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-thumbnail">
                  <i className="fas fa-check-circle course-icon"></i>
                </div>
                <h3>{course.title}</h3>
                <span className="badge badge-completed">Completed</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KidDashboard;
