import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../apis/config";

const AddLesson = () => {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: "",
    content: "",
    order: 0,
    course: "",
    video_url: "",
    resources: "",
    is_published: true,
  });
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("admin/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "course") {
      // When course changes, find the selected course to get instructors
      const course = courses.find((c) => c.id == value);
      setSelectedCourse(course);
    }

    setLesson((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/lessons/", lesson);
      alert("Lesson created successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert(
        "Failed to create lesson: " +
          (error.response?.data?.detail || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mb-5" style={{ marginTop: "8rem" }}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <hr />
          <Link to="/admin/dashboard" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-5" style={{ marginTop: "8rem" }}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title mb-4">Add New Lesson</h1>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter lesson title"
              />
            </div>

            {/* Course Selection */}
            <div className="mb-3">
              <label className="form-label">Course *</label>
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
            {selectedCourse && (
              <div className="mb-3">
                <label className="form-label">Course Instructors</label>
                <input
                  type="text"
                  value={
                    selectedCourse.instructors_names ||
                    "No instructors assigned"
                  }
                  className="form-control"
                  readOnly
                  disabled
                  style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
                />
                <small className="text-muted">
                  Instructors are assigned to the course, not individual lessons
                </small>
              </div>
            )}

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
                placeholder="0"
              />
              <small className="text-muted">
                Determines the sequence of lessons within the course (lower
                numbers appear first)
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
              <small className="text-muted">
                Optional: Link to a video for this lesson
              </small>
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content *</label>
              <textarea
                name="content"
                value={lesson.content}
                onChange={handleChange}
                rows={8}
                className="form-control"
                placeholder="Enter lesson content in Markdown format..."
                required
              />
              <small className="text-muted">
                Supports Markdown formatting for rich content
              </small>
            </div>

            {/* Published Status */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="is_published"
                checked={lesson.is_published}
                onChange={handleChange}
                className="form-check-input"
                id="isPublishedCheck"
              />
              <label className="form-check-label" htmlFor="isPublishedCheck">
                Publish lesson immediately
              </label>
              <small className="text-muted d-block">
                Uncheck to save as draft
              </small>
            </div>

            {/* Submit Buttons */}
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="submit"
                className="btn-primary shadow-none px-4"
                style={{ borderRadius: "50px" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Creating...
                  </>
                ) : (
                  "Create Lesson"
                )}
              </button>
              <Link to="/admin/dashboard" className="text-decoration-none">
                <button
                  type="button"
                  className="btn btn-danger shadow-none px-4"
                  disabled={loading}
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

export default AddLesson;
