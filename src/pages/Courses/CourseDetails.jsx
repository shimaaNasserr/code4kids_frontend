import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Courses.css";
import axiosInstance from "../../apis/config";

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
      const res = await axiosInstance.get("my-enrollments/");
      const alreadyEnrolled = res.data.some(
        (enrollment) => enrollment.course.id === Number(id)
      );
      setIsEnrolled(alreadyEnrolled);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const enrollInCourse = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      setbtnLoading(true);

      const res = await axiosInstance.post("enroll/", {
        course_id: id,
        user_id: localStorage.getItem("userId"),
      });

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
      const res = await axiosInstance.post("unenroll/", {
        course_id: id,
        user_id: localStorage.getItem("userId"), // include only if API expects it
      });

      console.log(res.data);
      setIsEnrolled(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await axiosInstance.get(`courses/${id}/`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonsOfCourse = async () => {
    try {
      const response = await axiosInstance.get("lessons/");
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
            backgroundColor: "rgba(71, 54, 83, 0.7)", // darker overlay
            zIndex: 1, // ensure it's below the text
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
                <h3 className="fw-bold mb-3">Instructors</h3>

                <div id="carouselExampleIndicators" className="carousel slide">
                  {course.instructors.length > 1 && (
                    <div className="carousel-indicators">
                      {course.instructors.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : undefined}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  )}

                  <div className="carousel-inner">
                    {course.instructors.map((instructor, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <div className="d-flex flex-column align-items-center text-center p-4">
                          {instructor.profile_image && (
                            <img
                              src={instructor.profile_image}
                              style={{ width: "120px", borderRadius: "50%" }}
                              alt={instructor.name}
                            />
                          )}
                          <h5 className="fw-semibold mt-3">
                            {instructor.name}
                          </h5>
                          <p className="mb-1 text-muted">
                            {instructor.specialization}
                          </p>
                          <p className="mb-1">
                            <b>Bio: </b> {instructor.bio}
                          </p>
                          <p className="text-muted mb-1">
                            <i className="fas fa-envelope"></i>{" "}
                            {instructor.email}
                          </p>
                          <p className="text-muted">
                            {instructor.years_of_experience} years of experience
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {course?.instructors?.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
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
