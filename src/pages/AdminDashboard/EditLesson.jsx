import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../apis/config";

const EditLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    id: "",
    title: "",
    content: "",
    order: 0,
    course: "",
    video_url: "",
    resources: "",
    is_published: true,
    course_instructors: "",
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchLesson();
    fetchCourses();
    fetchInstructors();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const response = await axiosInstance.get(`/lessons/${id}/`);
      setLesson(response.data);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      setError("Failed to fetch lesson data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("admin/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axiosInstance.get("admin/instructors/");
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLesson((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/lessons/${id}/`, lesson);
      setSuccessMessage("✅ Lesson updated successfully!");
      setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    } catch (error) {
      console.error("Error updating lesson:", error);
      setErrorMessage("❌ Failed to update lesson. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="container " style={{ marginTop: "8rem" }}>
        Loading lesson...
      </div>
    );
  if (error)
    return (
      <div className="container " style={{ marginTop: "8rem" }}>
        {error}
      </div>
    );

  return (
    <div className="container mb-5" style={{ marginTop: "2rem" }}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title mb-4">Edit Lesson</h1>
          {successMessage && (
            <div
              className="alert alert-success text-center fw-bold mb-4"
              role="alert"
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              className="alert alert-danger text-center fw-bold mb-4"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Course Selection */}
            <div className="mb-3">
              <label className="form-label">Course</label>
              <select
                name="course"
                value={lesson.course}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Instructors (Read-only) */}
            <div className="mb-3">
              <label className="form-label">Course Instructors</label>
              <input
                type="text"
                name="course_instructors"
                value={lesson.course_instructors}
                className="form-control"
                readOnly
                disabled
                style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
              />
              <small className="text-muted">
                Instructors are assigned to the course, not individual lessons
              </small>
            </div>

            {/* Order */}
            <div className="mb-3">
              <label className="form-label">Order</label>
              <input
                type="number"
                name="order"
                value={lesson.order}
                onChange={handleChange}
                className="form-control"
                min="0"
              />
              <small className="text-muted">
                Determines the sequence of lessons within the course
              </small>
            </div>

            {/* Video URL */}
            <div className="mb-3">
              <label className="form-label">Video URL</label>
              <input
                type="url"
                name="video_url"
                value={lesson.video_url}
                onChange={handleChange}
                className="form-control"
                placeholder="https://example.com/video.mp4"
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                name="content"
                value={lesson.content}
                onChange={handleChange}
                rows={6}
                className="form-control"
                placeholder="Lesson content in Markdown format..."
              />
            </div>

            {/* Active Status */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="is_published"
                checked={lesson.is_published}
                onChange={handleChange}
                className="form-check-input"
                id="isActiveCheck"
              />
              <label className="form-check-label" htmlFor="isActiveCheck">
                Lesson is Published
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="submit"
                className="btn-primary shadow-none px-4"
                style={{ borderRadius: "50px" }}
              >
                Save Changes
              </button>
              <Link to="/admin/categories" className="text-decoration-none">
                <button
                  type="button"
                  className="btn btn-danger shadow-none px-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLesson;
