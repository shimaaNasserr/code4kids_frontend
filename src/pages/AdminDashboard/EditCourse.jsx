import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../apis/config";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]); // all instructors
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchCategories();
    fetchInstructors();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await axiosInstance.get(`/courses/${id}/`);
      setCourse(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching course:", err);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchInstructors = async () => {
    try {
      const res = await axiosInstance.get("/instructors/");
      setInstructors(res.data);
    } catch (err) {
      console.error("Error fetching instructors:", err);
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCategoriesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) =>
      Number(opt.value)
    );
    setCourse({ ...course, categories: selected });
  };

  const handleInstructorChange = (index, newId) => {
    const updated = [...course.instructors];
    const selectedInstructor = instructors.find(
      (inst) => inst.id === Number(newId)
    );
    updated[index] = selectedInstructor;
    setCourse({ ...course, instructors: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: Check what's in course.categories
    console.log("Current course categories:", course.categories);
    console.log("Current course object:", course);

    try {
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("level", course.level);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // FIXED: Handle both array formats (objects with id property and direct IDs)
      let categoryIds = [];

      if (course.categories && course.categories.length > 0) {
        // Check if first element is an object with id property or a direct ID
        if (
          typeof course.categories[0] === "object" &&
          course.categories[0].id !== undefined
        ) {
          // Format: [{id: 3}, {id: 5}, ...]
          categoryIds = course.categories
            .filter((c) => c?.id != null)
            .map((c) => c.id);
        } else {
          // Format: [3, 5, ...] - direct IDs
          categoryIds = course.categories.filter((id) => id != null);
        }
      }

      console.log("Category IDs to send:", categoryIds);

      // Append each category ID
      categoryIds.forEach((id) => {
        formData.append("category_ids", id);
      });

      // Append each instructor ID separately as a string
      course.instructors.forEach((i) => {
        if (i?.id != null) formData.append("instructor_ids", i.id);
      });

      // ✅ log all entries
      console.log("All FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axiosInstance.put(`admin/courses/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ Course updated successfully!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
      if (imageFile) {
        setCourse((prev) => ({
          ...prev,
          image_url: URL.createObjectURL(imageFile),
        }));
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setErrorMessage("❌ Failed to update course. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!course) return <p className="text-center mt-5">Course not found</p>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title mb-4">Edit Course</h1>
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
                value={course.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Level */}
            <div className="mb-3">
              <label className="form-label">Level</label>
              <select
                name="level"
                value={course.level}
                onChange={handleChange}
                className="form-select"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Course Image</label>
              <div className="mb-2">
                <img
                  src={course.image_url}
                  alt="Course"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              </div>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <small className="text-muted">Current: {course.image_url}</small>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleChange}
                rows={4}
                className="form-control"
              />
            </div>

            {/* Categories */}
            <div className="mb-3">
              <label className="form-label">Categories</label>
              <select
                multiple
                value={course.categories.map((c) => c.id || c)}
                onChange={handleCategoriesChange}
                className="form-select"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <small className="text-muted">
                Hold Ctrl (or Cmd) to select multiple
              </small>
            </div>

            {/* Instructors */}
            <div className="mb-3">
              <label className="form-label">Instructors</label>
              {course.instructors.map((inst, index) => (
                <div key={index} className="mb-2">
                  <select
                    className="form-select"
                    value={inst.id}
                    onChange={(e) =>
                      handleInstructorChange(index, e.target.value)
                    }
                  >
                    {instructors.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="submit"
                className=" btn-primary shadow-none px-4"
                style={{ borderRadius: "50px" }}
              >
                Save Changes
              </button>
              <Link to={`/admin/courses`} className=" text-decoration-none">
                <button
                  type="submit"
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

export default EditCourse;
