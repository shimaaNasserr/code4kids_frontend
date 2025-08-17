import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../apis/config";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("courses/").then((response) => {
        setLoading(false);
        setCourses(response.data);
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className="text-center mb-5 " style={{ marginTop: "8rem" }}>
        <h2 className="fs-1 fw-bold mb-3 text-gradient">
          Let's start learning!
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ height: "50vh", width: "95vw", overflowY: "hidden" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {courses.map((course) => {
          return (
            <NavLink
              className=" course-card rounded-4 overflow-hidden shadow-sm border-0 position-relative text-decoration-none"
              to={`/course-details/${course.id}`}
              key={course.id}
              style={{ height: "min-content" }}
            >
              <div className="bg-success bg-opacity-10 text-center">
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div className="p-2">
                <span
                  className={`badge bg-success bg-opacity-10 text-dark px-3 py-2 rounded-pill fw-bold mb-3 ${
                    course.level === "beginner"
                      ? "bg-success"
                      : course.level === "intermediate"
                      ? "bg-warning text-warning"
                      : course.level === "advanced"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {course.level ? `Level: ${course.level}` : "Level: N/A"}
                </span>
                <h3 className="h5 fw-bold mb-3">{course.title}</h3>
                <p className="text-muted mb-4">
                  {handleText(course.description, 30)}
                </p>
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="d-flex align-items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#F59E0B"
                      className="me-1"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="small text-muted">4.8 (980)</span>
                  </div>
                  <NavLink
                    to={`/course-details/${course.id}`}
                    className="btn btn-sm btn-outline-success px-3 m-0"
                  >
                    Start Now
                  </NavLink>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
