import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Courses.css";

function CourseDetails() {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setbtnLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const id = useParams().id;
  const navigate = useNavigate();

  const checkEnrollment = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get(`http://127.0.0.1:8000/api/my-enrollments/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      const alreadyEnrolled = res.data.some(
        (enrollment) => enrollment.course.id === Number(id)
      );

      setIsEnrolled(alreadyEnrolled);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const enrollInCourse = async () => {
    try {
      setbtnLoading(true);
      const token = localStorage.getItem("userToken");
      const res = await axios.post(
        `http://127.0.0.1:8000/api/enroll/`,
        {
          course_id: id,
          user_id: localStorage.getItem("userId"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEnrolled(true);
      navigate(`/courses/${id}/lessons`);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setbtnLoading(false);
    }
  };

  const unenrollFromCourse = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.post(
        `http://127.0.0.1:8000/api/unenroll/`,
        {
          course_id: id, // current course id
          user_id: localStorage.getItem("userId"), // only if your API needs it
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setIsEnrolled(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${id}/`
      );
      setLoading(false);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchLessonsOfCourse = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/lessons/`);
      const filteredLessons = response.data.filter(
        (lesson) => lesson.course === Number(id)
      );
      setLessons(filteredLessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchLessonsOfCourse();
    checkEnrollment();
  }, [id]);

  
    return loading ? (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: "50vh", width: "95vw", overflowY: "hidden" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <>
        <div
          style={{
            position: "relative",
            backgroundImage: `url(${course.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "50px",
            height: "45vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)", // 0.5 = 50% dark
            }}
          ></div>

          <div
            style={{ position: "relative", zIndex: 1 }}
            className="d-flex flex-column justify-content-around align-items-center h-100"
          >
            <h1>{course.title}</h1>
            <button
              className="p-2 rounded-5 fw-bold outline-0  enrol-btn"
              onClick={isEnrolled ? unenrollFromCourse : enrollInCourse}
            >
              {isEnrolled ? (
                "Enrolled"
              ) : btnLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Enroll in this course"
              )}
            </button>
          </div>
        </div>
        <div className="container my-4">
          <div className="row g-4 rounded-3  p-4">
            {/* Left: Course Description */}
            <div className="col-md-5">
              <h2 className="fw-bold mb-3">Course Description</h2>
              <p className="text-muted">{course.description}</p>
              <span
                className={`badge px-3 py-2 ${
                  course.level === "beginner"
                    ? "bg-success"
                    : course.level === "intermediate"
                    ? "bg-warning text-dark"
                    : course.level === "advanced"
                    ? "bg-danger"
                    : "bg-secondary"
                }`}
              >
                {course.level ? `Level: ${course.level}` : "Level: N/A"}
              </span>
            </div>

            {/* Right: Lessons */}
            <div className="col-md-7">
              <div className="row g-3">
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <div className="col-md-12" key={lesson.id}>
                      {/* Lesson Card */}
                      <div className="card shadow-sm h-100">
                        <div className="card-body d-flex align-items-start">
                          <div className="me-3 fs-4 text-primary">📄</div>
                          <div>
                            <h5 className="card-title fw-semibold">
                              {lesson.title}
                            </h5>
                            <p className="card-text text-muted">
                              {lesson.description ||
                                "No description available."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No lessons available for this course.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }


export default CourseDetails;
