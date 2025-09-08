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
        const res = await axiosInstance.get("/users/my-children/");
        setKids(res.data);
      } catch (err) {
        console.error("Error fetching children:", err);
      }
    };
    fetchChildren();
  }, []);

  // ✅ Link child by code
  const handleAddChild = async () => {
    try {
      await axios.post("/api/accounts/link-child/", { child_code });
      setShowAddModal(false);
      setChildCode("");
      // Re-fetch children after adding
      const res = await axios.get("/api/accounts/my-children/");
      setKids(res.data);
    } catch (err) {
      alert("❌ Invalid child code or already linked.");
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
            <h3 className="text-gradient">{selectedKid.kid_name}'s Dashboard</h3>
            <div className="stats-cards">
              <div className="stat-card">
                <h4>Total Courses</h4>
                <p>{selectedKid.total_courses}</p>
              </div>
              <div className="stat-card">
                <h4>Completed Lessons</h4>
                <p>{selectedKid.total_completed_lessons}</p>
              </div>
              <div className="stat-card">
                <h4>Points</h4>
                <p>{selectedKid.kid_points}</p>
              </div>
            </div>
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