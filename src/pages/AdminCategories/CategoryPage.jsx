import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import { useDelete } from "../../apis/useDelete.js";
import ConfirmationModal from "../../components/Modal/ConfirmationModal.jsx";

const CategoryPage = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteType, setDeleteType] = useState(null);
  const coursesPerPage = 6;
  const {
    showModal,
    itemToDelete,
    loading: deleteLoading,
    toast,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDelete();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get(`/categories/${id}/courses/`);
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const updateCoursesState = (deletedId) => {
    setCourses(courses.filter((course) => course.id !== deletedId));
  };

  const handleCourseDelete = () => {
    handleDeleteConfirm(
      `admin/courses/${itemToDelete.id}/`,
      updateCoursesState
    );
    console.log("Deleting course with ID:", itemToDelete.id);
  };

  const handleItemDeleteClick = (item, type) => {
    setDeleteType(type);
    handleDeleteClick(item);
  };

  const handleDelete = () => {
    if (deleteType === "course") {
      handleCourseDelete();
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: toast.type === "success" ? "#28a745" : "#dc3545",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            zIndex: 9999,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          {toast.message}
        </div>
      )}
      <ConfirmationModal
        isOpen={showModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleDelete}
        itemName={itemToDelete?.title}
        loading={deleteLoading}
      />
      <h3 className="mb-4 text-center">Courses in this Category</h3>

      {courses.length === 0 ? (
        <div className="alert alert-info text-center">
          No courses found for this category.
        </div>
      ) : (
        <>
          <div className="row">
            {currentCourses.map((course) => (
              <div className="col-md-4 mb-3" key={course.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-muted">
                      {truncateText(course.description, 120)}
                    </p>
                    <Link
                      to={`/admin/courses/${course.id}/lessons`}
                      className="text-decoration-none"
                    >
                      <p
                        className="text-info mb-3 "
                        style={{ cursor: "pointer" }}
                      >
                        Click to see lessons in course
                      </p>
                    </Link>
                    <div className="d-flex gap-2 flex-wrap">
                      <Link
                        to={`/admin/courses/${course.id}/edit`}
                        className=" text-decoration-none"
                      >
                        <button className="btn btn-warning shadow-none">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger shadow-none"
                        onClick={() => handleItemDeleteClick(course, "course")}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages).keys()].map((num) => (
                <li
                  key={num}
                  className={`page-item ${
                    currentPage === num + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(num + 1)}
                  >
                    {num + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
