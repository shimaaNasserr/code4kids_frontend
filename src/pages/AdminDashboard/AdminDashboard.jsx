import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useDelete } from "../../apis/useDelete.js";
import ConfirmationModal from "../../components/Modal/ConfirmationModal.jsx";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);



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
    const fetchData = async () => {
      try {
        const [coursesRes, lessonsRes] = await Promise.all([
          axiosInstance.get("/courses/"),
          axiosInstance.get("/lessons/"),
        ]);
        setCourses(coursesRes.data);
        setLessons(lessonsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateCoursesState = (deletedId) => {
    setCourses(courses.filter((course) => course.id !== deletedId));
  };

  const updateLessonsState = (deletedId) => {
    setLessons(lessons.filter((lesson) => lesson.id !== deletedId));
  };

  const handleCourseDelete = () => {
    handleDeleteConfirm(
      `admin/courses/${itemToDelete.id}/`,
      updateCoursesState
    );
    console.log("Deleting course with ID:", itemToDelete.id);
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
    if (deleteType === "course") {
      handleCourseDelete();
    } else if (deleteType === "lesson") {
      handleLessonDelete();
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
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
      <div className="container d-flex justify-content-center gap-3 mb-4">
        <Link className="text-decoration-none" to={"/admin/courses/add-new"}>
          <button className="btn-primary" style={{ borderRadius: "50px" }}>
            Add new course
          </button>
        </Link>
        <Link className="text-decoration-none" to={"/admin/lessons/add-new"}>
          <button className="btn btn-info text-white">Add new lesson</button>
        </Link>
      </div>
      {/* Courses Table */}
      <h2 className="text-xl font-semibold mb-2 text-center">Courses</h2>
      <div className="w-full">
        <table
          className="w-full border mb-3"
          style={{ margin: "0 auto", width: "80vw" }}
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-center">ID</th>
              <th className="p-2 border text-center">Name</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <tr key={course.id}>
                <td className="p-2 border text-center">{course.id}</td>
                <td className="p-2 border text-center">{course.title}</td>
                <td className="p-2 border">
                  <div className="d-flex gap-2 justify-content-center">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lessons Table */}
      <h2 className="text-xl font-semibold text-center">Lessons</h2>
      <div className="w-full">
        <table
          className="w-full border mb-3"
          style={{ margin: "0 auto", width: "80vw" }}
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-center">ID</th>
              <th className="p-2 border text-center">Title</th>
              <th className="p-2 border text-center">Course</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td className="p-2 border text-center">{lesson.id}</td>
                <td className="p-2 border text-center">{lesson.title}</td>
                <td className="p-2 border text-center">
                  {lesson.course_title}
                </td>
                <td className="p-2 border text-center">
                  <div className="d-flex gap-2 justify-content-center">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDashboard;
