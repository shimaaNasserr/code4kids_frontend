// src/pages/Dashboard/ParentDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/config";
import "./Dashboard.css";

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [childCode, setChildCode] = useState("");
  const navigate = useNavigate();

  const fetchChildren = async () => {
    try {
      const res = await axiosInstance.get("/progress/parent-dashboard/");
      console.log("Parent Dashboard Response:", res.data); // سطر الطباعة للتأكد
      if (res.data && Array.isArray(res.data.children)) {
        setChildren(res.data.children);
      } else {
        console.warn("⚠️ Unexpected response format: ", res.data);
        setChildren([]);
      }
    } catch (err) {
      console.error("fetchChildren error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleAddChild = async () => {
    if (!childCode.trim()) {
      alert("أدخل كود الطفل");
      return;
    }
    try {
      const res = await axiosInstance.post("/accounts/link-child/", { child_code: childCode });
      setShowAddModal(false);
      setChildCode("");
      await fetchChildren();
      // alert(res.data.message || "Child linked");
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data || err.message;
      // alert("❌ " + (typeof msg === "string" ? msg : JSON.stringify(msg)));
    }
  };

  return (
    <div className="dashboard-container container">
      <div className="header">
        <h2 className="text-gradient">Your Children</h2>
      </div>

      <div className="kids-grid">
        {children.map((kid) => (
          <div
            key={kid.id}
            className="kid-card"
            onClick={() => navigate(`/parent-dashboard/child/${kid.id}`)}
          >
            <div className="kid-avatar-container">
              {kid.avatar ? (
                <img src={kid.avatar} alt={kid.name} className="kid-avatar-img" />
              ) : (
                <div className="kid-avatar-fallback">
                     <FaUserGraduate className="kid-avatar-icon" />
                </div>
              )}
            </div>
            <div className="kid-name">{kid.name}</div>
          </div>
        ))}

        {/* Add-child card */}
        <div className="kid-card add-card" onClick={() => setShowAddModal(true)}>
          <div className="kid-avatar-container">
            <div className="kid-avatar-fallback">+</div>
          </div>
          <div className="kid-name text-gradient">Add Child</div>
        </div>
      </div>

      {/* Add child modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-gradient">Add Child</h3>
            
            <input
              type="text"
              placeholder="Enter child code"
              value={childCode}
              onChange={(e) => setChildCode(e.target.value)}
              className="input-child-code"
            />

            <div className="modal-buttons">
              <button
                className="btn-link"
                onClick={handleAddChild}
              >
                Link
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ParentDashboard;
