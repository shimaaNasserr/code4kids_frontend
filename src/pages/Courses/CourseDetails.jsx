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
            backgroundImage: `url(${course.image_url})`,
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
              backgroundColor: "rgba(71, 54, 83, 0.5)",
            }}
          ></div>

          <div
            style={{ position: "relative", zIndex: 1 }}
            className="d-flex flex-column justify-content-around align-items-center h-100"
          >
            <h1>{course.title}</h1>
            <button
              className="rounded-5 outline-0  enrol-btn"
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
                "Enroll"
              )}
            </button>
          </div>
        </div>
        <>
          <div className="container">
            {/* Top Row */}
            <div className="row g-3 mt-3">
              {/* Left: Course Description */}
              <div className="col-md-6">
                <div
                  className="p-4 rounded-3 shadow-sm h-100"
                  style={{
                    backgroundColor: "#e9d9f5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <h2 className="fw-bold mb-3">Course Description</h2>
                  <p className="text-dark">{course.description}</p>
                  <span
                    style={{ width: "min-content" }}
                    className={`badge px-3 py-2 fs-6 ${
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
              </div>

              {/* Right: Instructor Details */}
              <div className="col-md-6">
                <div className="p-4 rounded-3 h-100 bg-white shadow-sm">
                  <h3 className="fw-bold mb-3">Instructor Details</h3>
                  <div className="d-flex align-items-center mb-4 gap-3">
                    {course.instructors[0].profile_image ? (
                      <img
                        src={course.instructors[0].profile_image}
                        style={{ width: "100px", borderRadius: "50%" }}
                      />
                    ) : (
                      ""
                    )}
                    <div>
                      <h5 className="fw-semibold">
                        {course.instructors[0].name}
                      </h5>
                      <p className="mb-1 text-muted">
                        {course.instructors[0].specialization}
                      </p>
                    </div>
                  </div>

                  <p className="mb-1">
                    <b>Bio:</b>
                    <br />
                    {course.instructors[0].bio}
                  </p>
                  <p className="text-muted mb-1">
                    <i className="fas fa-envelope"></i>
                    {course.instructors[0].email}
                  </p>

                  <p className="text-muted">
                    {course.instructors[0].years_of_experience} years of
                    experience
                  </p>
                </div>
              </div>
            </div>

            {/* Lessons Row */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="p-4 rounded-3 bg-white shadow-sm">
                  <h2 className="fw-bold mb-4">Lessons in the course</h2>
                  {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="d-flex align-items-start mb-3 pb-3 border-bottom"
                      >
                        <div className="me-3 fs-4 text-primary">📄</div>
                        <div>
                          <h5 className="fw-semibold mb-1">{lesson.title}</h5>
                          <p className="text-muted mb-0">
                            {lesson.description || "No description available."}
                          </p>
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
      </>
    );
  }


export default CourseDetails;
