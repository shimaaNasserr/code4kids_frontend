import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import { Link, useNavigate } from "react-router-dom";

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 6;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const indexOfLast = currentPage * categoriesPerPage;
  const indexOfFirst = indexOfLast - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      const categoriesData = await Promise.all(
        res.data.map(async (cat) => {
          const coursesRes = await axiosInstance.get(
            `/categories/${cat.id}/courses/`
          );
          return { ...cat, course_count: coursesRes.data.length };
        })
      );
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <h3 className="mb-4 text-center">Courses Categories</h3>
      <div className="row">
        {currentCategories.map((category) => (
          <div
            className="col-md-4 mb-3"
            key={category.id}
            onClick={() => navigate(`/admin/categories/${category.id}/courses`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={category.image || "https://via.placeholder.com/400x200"}
                className="card-img-top"
                alt={category.name}
              />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p
                  className="card-text"
                  style={{ color: "#00465F", fontWeight: "500" }}
                >
                  {category.description}
                </p>
                <p>Total courses in Category: {category.course_count}</p>
                <span className="text-muted">Click to see courses {">>"}</span>
              </div>
            </div>
          </div>
        ))}
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
      </div>
    </div>
  );
};
