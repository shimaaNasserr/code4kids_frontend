import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function CourseDetails() {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

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

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  {
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
          </div>
        </div>
        <div className="container mt-3">
          <h4>Course Description</h4>
          <p>{course.description}</p>
          <span
            className="p-2 text-white rounded-3"
            style={{ backgroundColor: "#6e48aa " }}
          >
            {course.level ? `Level: ${course.level}` : "Level: N/A"}
          </span>
        </div>
      </>
    );
  }
}

export default CourseDetails;
