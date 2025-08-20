import React, { useState } from "react";
import "./Dashboard.css";

const ParentDashboard = () => {
  const [selectedKid, setSelectedKid] = useState(null);

  const kids = [
    {
      id: 1,
      name: "Omar",
      courses: [
        { id: 1, title: "Python Basics", status: "completed" },
        { id: 2, title: "Scratch Game Dev", status: "in-progress" },
      ],
    },
    {
      id: 2,
      name: "Maya",
      courses: [
        { id: 3, title: "Web Development", status: "in-progress" },
        { id: 4, title: "AI for Kids", status: "completed" },
      ],
    },
  ];

  return (
    <div className="dashboard-container container">
      <div className="kids-grid">
        {kids.map((kid) => (
          <div
            key={kid.id}
            className="kid-card"
            onClick={() => setSelectedKid(kid)}
          >
            <div className="kid-avatar">
              <i className="fas fa-user-graduate"></i>
            </div>
            <h4>{kid.name}</h4>
          </div>
        ))}
      </div>

      {selectedKid && (
        <div className="modal-overlay" onClick={() => setSelectedKid(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-gradient">{selectedKid.name}'s Courses</h3>
            <div className="stats-cards">
              <div className="stat-card">
                <h4>Total Courses</h4>
                <p>{selectedKid.courses.length}</p>
              </div>
              <div className="stat-card">
                <h4>Completed</h4>
                <p>
                  {selectedKid.courses.filter((c) => c.status === "completed")
                    .length}
                </p>
              </div>
              <div className="stat-card">
                <h4>In Progress</h4>
                <p>
                  {selectedKid.courses.filter(
                    (c) => c.status === "in-progress"
                  ).length}
                </p>
              </div>
            </div>

            <div className="courses-section">
              <h3 className="section-title">In Progress</h3>
              <div className="courses-grid">
                {selectedKid.courses
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
                {selectedKid.courses
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
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
