import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../apis/config";

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axiosInstance.post("admin/categories/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ Category created successfully!");
      setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mb-5" style={{ marginTop: "2rem" }}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title mb-4">Add New Category</h1>

          {successMessage && (
            <div
              className="toast align-items-center text-bg-success border-0 show position-fixed start-50 translate-middle-x mb-4"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{ bottom: "20px", zIndex: 1055 }}
            >
              <div className="d-flex">
                <div className="toast-body fw-bold">{successMessage}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  aria-label="Close"
                  onClick={() => setSuccessMessage(null)}
                ></button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={category.description}
                onChange={handleChange}
                rows={4}
                className="form-control"
                required
                placeholder="Enter category description..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Category Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <small className="text-muted">
                Recommended size: 600x400 pixels
              </small>
            </div>

            {/* Submit + Cancel */}
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
                  "Create Category"
                )}
              </button>
              <Link to="/admin/categories" className="text-decoration-none">
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

export default AddCategory;
