import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../apis/config";

const AddCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    level: "beginner",
    categories: [],
    instructors: [],
  });
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchInstructors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("admin/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axiosInstance.get("admin/instructors/");
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      setError("Failed to load instructors");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoriesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      id: parseInt(option.value),
      name: option.text,
    }));
    setCourse((prev) => ({
      ...prev,
      categories: selectedOptions,
    }));
  };

  const handleInstructorChange = (index, instructorId) => {
    const selectedInstructor = instructors.find(
      (inst) => inst.id === parseInt(instructorId)
    );
    if (selectedInstructor) {
      const updatedInstructors = [...course.instructors];
      updatedInstructors[index] = selectedInstructor;
      setCourse((prev) => ({
        ...prev,
        instructors: updatedInstructors,
      }));
    }
  };

  const addInstructorField = () => {
    setCourse((prev) => ({
      ...prev,
      instructors: [...prev.instructors, { id: "", name: "" }],
    }));
  };

  const removeInstructorField = (index) => {
    setCourse((prev) => ({
      ...prev,
      instructors: prev.instructors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("level", course.level);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Append each category ID
      course.categories.forEach((c) => {
        if (c?.id != null) formData.append("category_ids", c.id);
      });

      // Append each instructor ID
      course.instructors.forEach((i) => {
        if (i?.id != null) formData.append("instructor_ids", i.id);
      });

      await axiosInstance.post("admin/courses/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Course created successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container my-5">
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
          <h1 className="card-title mb-4">Add New Course</h1>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Level */}
            <div className="mb-3">
              <label className="form-label">Level *</label>
              <select
                name="level"
                value={course.level}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Course Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <small className="text-muted">
                Recommended size: 800x400 pixels
              </small>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleChange}
                rows={4}
                className="form-control"
                required
                placeholder="Enter course description..."
              />
            </div>

            {/* Categories */}
            <div className="mb-3">
              <label className="form-label">Categories *</label>
              <select
                multiple
                value={course.categories.map((c) => c.id)}
                onChange={handleCategoriesChange}
                className="form-select"
                required
                size="4"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <small className="text-muted">
                Hold Ctrl (or Cmd) to select multiple categories
              </small>
              {course.categories.length > 0 && (
                <div className="mt-2">
                  <strong>Selected categories:</strong>
                  <div className="d-flex flex-wrap gap-2 mt-1">
                    {course.categories.map((cat, index) => (
                      <span key={index} className="badge bg-primary">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instructors */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label">Instructors *</label>
                <button
                  type="button"
                  onClick={addInstructorField}
                  className="btn btn-sm btn-outline-primary"
                >
                  Add Instructor
                </button>
              </div>

              {course.instructors.length === 0 ? (
                <div className="alert alert-info py-2">
                  <small>
                    Click "Add Instructor" to assign instructors to this course
                  </small>
                </div>
              ) : (
                course.instructors.map((inst, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <select
                      className="form-select me-2"
                      value={inst.id}
                      onChange={(e) =>
                        handleInstructorChange(index, e.target.value)
                      }
                      required
                    >
                      <option value="">Select an instructor</option>
                      {instructors.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeInstructorField(index)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Submit */}
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
                  "Create Course"
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

export default AddCourse;
