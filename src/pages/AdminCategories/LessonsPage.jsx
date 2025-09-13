import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { useDelete } from "../../apis/useDelete";

const LessonsPage = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
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
    const fetchLessons = async () => {
      try {
        const res = await axiosInstance.get(`/lessons/`);
        const filtered = res.data.filter(
          (lesson) => lesson.course === parseInt(id)
        );
        setLessons(filtered);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [id]);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentLessons = lessons.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(lessons.length / coursesPerPage);

  const updateLessonsState = (deletedId) => {
    setLessons(lessons.filter((lesson) => lesson.id !== deletedId));
  };

  const handleLessonDelete = () => {
    handleDeleteConfirm(
      `admin/lessons/${itemToDelete.id}/`,
      updateLessonsState
    );
  };

  const handleItemDeleteClick = (item, type) => {
    setDeleteType(type);
    handleDeleteClick(item);
  };

  const handleDelete = () => {
    if (deleteType === "lesson") {
      handleLessonDelete();
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
      <h3 className="mb-4 text-center">Lessons in this Course</h3>
      {lessons.length === 0 ? (
        <div className="alert alert-info text-center">
          No lessons found for this course.
        </div>
      ) : (
        <>
          <div className="row">
            {currentLessons.map((lesson) => (
              <div className="col-md-4 mb-3" key={lesson.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{lesson.title}</h5>
                    <p className="card-text text-muted">
                      {truncateText(lesson.description, 100)}
                    </p>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/admin/lessons/${lesson.id}/edit`}
                        className=" text-decoration-none"
                      >
                        <button className="btn btn-warning shadow-none">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger shadow-none"
                        onClick={() => handleItemDeleteClick(lesson, "lesson")}
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

export default LessonsPage;
