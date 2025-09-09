import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import "./Dashboard.css";

const ParentDashboard = () => {
  const [kids, setKids] = useState([]);
  const [selectedKid, setSelectedKid] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [childCode, setChildCode] = useState("");

  // ✅ Fetch children from backend
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await axiosInstance.get("accounts/my-children/");
        setKids(res.data);
      } catch (err) {
        console.error("Error fetching children:", err.response?.data || err.message);
      }
    };
    fetchChildren();
  }, []);

  // ✅ Link child by code
  const handleAddChild = async () => {
    try {
      const res = await axiosInstance.post("accounts/link-child/", { child_code: childCode });
      setShowAddModal(false);
      setChildCode("");
      // Re-fetch children after adding
      const r2 = await axiosInstance.get("accounts/my-children/");
      console.log("Children:", r2.data); // ✅ تأكدي إن الداتا جاية
      setKids(r2.data);
      alert(res.data.message || "Child linked.");
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.error || err.response?.data || err.message;
      alert("❌ " + (typeof msg === "string" ? msg : JSON.stringify(msg)));
    }
  };

  return (
    <div className="dashboard-container container">
      <div className="header">
        <h2>Your Children</h2>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          + Add Child
        </button>
      </div>

      <div className="kids-grid">
        {kids.map((kid) => (
          <div
            key={kid.kid}
            className="kid-card"
            onClick={() => setSelectedKid(kid)}
          >
            <div className="kid-avatar">
              {kid.kid_avatar ? (
                <img src={kid.kid_avatar} alt="Kid Avatar" />
              ) : (
                <i className="fas fa-user-graduate"></i>
              )}
            </div>
            <h4>{kid.kid_name}</h4>
          </div>
        ))}
      </div>

      {/* ✅ Kid Dashboard Modal */}
      {selectedKid && (
        <div className="modal-overlay" onClick={() => setSelectedKid(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-gradient">{selectedKid.first_name}'s Dashboard</h3>

            <div className="stats-cards">
              <div className="stat-card">
                <h4>Points</h4>
                <p>{selectedKid.profile.points}</p>
              </div>
              <div className="stat-card">
                <h4>Courses Enrolled</h4>
                <p>{selectedKid.enrolled_courses.length}</p>
              </div>
            </div>

            <h4>Enrolled Courses</h4>
            <ul>
              {selectedKid.enrolled_courses.map((course) => (
                <li key={course.course}>
                  {course.course_title} - {course.progress_percentage}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}


      {/* ✅ Add Child Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-gradient">Add Child</h3>
            <input
              type="text"
              placeholder="Enter child code"
              value={childCode}
              onChange={(e) => setChildCode(e.target.value)}
              className="input"
            />
            <button className="btn-confirm" onClick={handleAddChild}>
              Link Child
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;