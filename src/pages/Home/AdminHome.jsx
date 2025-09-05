import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from "../../apis/config";

const AdminHome = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userToken = params.get("userToken");
    const refresh = params.get("refresh");

    if (userToken) {
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("refreshToken", refresh);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleCourses = async () => {
    if (!token) return;
    
    try {
      const response = await axiosInstance.get("courses/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    handleCourses();
  }, [token]);

  return (
    <div className="admin-home-page">
      {/* Admin Hero Section */}
      <header className="admin-hero-section py-5 position-relative overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Welcome to <span className="admin-text-gradient">Admin Dashboard</span> </h1>
              <p className="admin-lead mb-4">Manage courses, users, and content with our powerful admin tools. Everything you need in one place.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                {token ? (
                  <>
              <NavLink
  to="/admin/dashboard"
  type="button"
  className="admin-btn admin-btn-success btn-lg px-5 py-3 fw-bold me-3"
  aria-label="Explore dashboard "
>
  Go To Dashboard
</NavLink>

<NavLink
  to="/admin/statistics"
  type="button"
  className="admin-btn admin-btn-primary btn-lg px-5 py-3 fw-bold"
  aria-label="Get started with admin dashboard"
>
  Statistics
</NavLink>
                  </>
                ) : ""}


              </div>
              <div className="admin-trust-badge mt-4 d-flex align-items-center justify-content-center justify-content-lg-start">
                <div className="d-flex me-3" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="#FFD700" 
                      stroke="#FFD700" 
                      className="me-1"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="admin-trust-text">
                  Trusted by thousands of educators worldwide
                  <span className="visually-hidden">, 5 out of 5 star rating</span>
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="admin-hero-illustration position-relative">
                <div className="admin-dashboard-preview p-4">
                  <div className="admin-window-controls d-flex gap-2 mb-3">
                    <span className="admin-window-dot admin-bg-danger"></span>
                    <span className="admin-window-dot admin-bg-warning"></span>
                    <span className="admin-window-dot admin-bg-success"></span>
                  </div>
                  <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                      <div className="admin-stat-value">1,250+</div>
                      <div className="admin-stat-label">Active Users</div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="admin-stat-value">98%</div>
                      <div className="admin-stat-label">Satisfaction</div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="admin-stat-value">24/7</div>
                      <div className="admin-stat-label">Support</div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="admin-stat-value">50+</div>
                      <div className="admin-stat-label">Courses</div>
                    </div>
                  </div>
                  <div className="admin-recent-activity mt-4">
                    <h6 className="admin-activity-title">Recent Activity</h6>
                    <ul className="admin-activity-list list-unstyled">
                      <li className="admin-activity-item">
                        <span className="admin-activity-badge admin-bg-primary"></span>
                        <span>New course added: <strong>Python Basics</strong></span>
                      </li>
                      <li className="admin-activity-item">
                        <span className="admin-activity-badge admin-bg-success"></span>
                        <span>5 new students enrolled today</span>
                      </li>
                      <li className="admin-activity-item">
                        <span className="admin-activity-badge admin-bg-warning"></span>
                        <span>3 assignments need grading</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>


   {/* Admin Features Section */}
   <section className="admin-features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="admin-section-title display-5 fw-bold mb-3">Powerful Admin Features</h2>
            <p className="admin-section-subtitle lead">Everything you need to manage your learning platform effectively</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="admin-feature-card h-100 p-4 rounded-4 shadow-sm position-relative overflow-hidden">
                <div className="admin-feature-icon mb-3">
                  <i className="fas fa-users-cog fa-3x"></i>
                </div>
                <h4 className="h5 fw-bold mb-3">User Management</h4>
                <p className="mb-0">Easily manage students, teachers, and administrators with our intuitive user management system.</p>
                <div className="admin-feature-decoration"></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="admin-feature-card h-100 p-4 rounded-4 shadow-sm position-relative overflow-hidden">
                <div className="admin-feature-icon mb-3">
                  <i className="fas fa-book-open fa-3x"></i>
                </div>
                <h4 className="h5 fw-bold mb-3">Course Management</h4>
                <p className="mb-0">Create, organize, and manage courses with our comprehensive course management tools.</p>
                <div className="admin-feature-decoration"></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="admin-feature-card h-100 p-4 rounded-4 shadow-sm position-relative overflow-hidden">
                <div className="admin-feature-icon mb-3">
                  <i className="fas fa-robot fa-3x admin-text-primary"></i>
                </div>
                <h4 className="h5 fw-bold mb-3">AI Assistant</h4>
                <p className="mb-0">Get instant help and guidance with our intelligent AI assistant, available 24/7 to support your learning journey.</p>
                <div className="admin-feature-decoration"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Admin Courses Section */}
      <section className="admin-courses-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="admin-section-title display-5 fw-bold mb-3">Manage Courses</h2>
            <p className="admin-section-subtitle lead">Create, organize, and track all your educational content in one place</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="admin-course-card h-100 rounded-4 overflow-hidden shadow-sm position-relative">
                <div className="admin-course-thumbnail admin-bg-primary-10 p-5 text-center">
                  <i className="fas fa-laptop-code fa-4x admin-text-primary"></i>
                </div>
                <div className="p-4">
                  <span className="admin-badge admin-badge-primary px-3 py-2 rounded-pill fw-normal mb-3">Programming</span>
                  <h3 className="h5 fw-bold mb-3">Python Fundamentals</h3>
                  <p className="admin-text-secondary mb-4">Introduction to programming with Python. Perfect for beginners starting their coding journey.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-users me-2 admin-text-muted"></i>
                      <span className="small admin-text-muted">1,250 Students</span>
                    </div>
                    <NavLink to="/admin/courses/python" className="admin-btn admin-btn-sm admin-btn-outline px-3">Manage</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="admin-course-card h-100 rounded-4 overflow-hidden shadow-sm position-relative">
                <div className="admin-course-thumbnail admin-bg-success-10 p-5 text-center">
                  <i className="fas fa-globe fa-4x admin-text-success"></i>
                </div>
                <div className="p-4">
                  <span className="admin-badge admin-badge-success px-3 py-2 rounded-pill fw-normal mb-3">Web Dev</span>
                  <h3 className="h5 fw-bold mb-3">Web Development</h3>
                  <p className="admin-text-secondary mb-4">Learn to build responsive websites with HTML, CSS, and JavaScript from the ground up.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-users me-2 admin-text-muted"></i>
                      <span className="small admin-text-muted">980 Students</span>
                    </div>
                    <NavLink to="/admin/courses/web" className="admin-btn admin-btn-sm admin-btn-outline px-3">Manage</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="admin-course-card h-100 rounded-4 overflow-hidden shadow-sm position-relative">
                <div className="admin-course-thumbnail admin-bg-warning-10 p-5 text-center">
                  <i className="fas fa-robot fa-4x admin-text-warning"></i>
                </div>
                <div className="p-4">
                  <span className="admin-badge admin-badge-warning px-3 py-2 rounded-pill fw-normal mb-3">AI/ML</span>
                  <h3 className="h5 fw-bold mb-3">AI for Beginners</h3>
                  <p className="admin-text-secondary mb-4">Introduction to artificial intelligence and machine learning concepts and applications.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-users me-2 admin-text-muted"></i>
                      <span className="small admin-text-muted">1,850 Students</span>
                    </div>
                    <NavLink to="/admin/courses/ai" className="admin-btn admin-btn-sm admin-btn-outline px-3">Manage</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <NavLink to="/admin/courses" className="admin-btn admin-btn-primary px-4 py-2 d-inline-flex align-items-center">
              View All Courses
              <i className="fas fa-arrow-right ms-2"></i>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Admin CTA Section */}
      <section className="admin-cta-section py-5 position-relative overflow-hidden">
        <div className="container position-relative z-2">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="admin-cta-title display-5 fw-bold mb-4">Ready to Manage Your Platform?</h2>
              <p className="admin-cta-subtitle lead mb-5">Access powerful tools to manage courses, users, and content all in one place.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <NavLink to="/admin/dashboard" className="admin-btn admin-btn-light btn-lg px-4 py-3 fw-bold">
                  Go to Dashboard
                </NavLink>
                <NavLink to="/admin/settings" className="admin-btn admin-btn-outline-light btn-lg px-4 py-3 fw-bold">
                  Platform Settings
                </NavLink>
              </div>
              <div className="admin-cta-stats mt-5">
                <div className="row g-4">
                  <div className="col-6 col-md-3">
                    <div className="admin-stat-item">
                      <div className="admin-stat-number">1,250+</div>
                      <div className="admin-stat-label">Active Users</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="admin-stat-item">
                      <div className="admin-stat-number">50+</div>
                      <div className="admin-stat-label">Courses</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="admin-stat-item">
                      <div className="admin-stat-number">98%</div>
                      <div className="admin-stat-label">Uptime</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="admin-stat-item">
                      <div className="admin-stat-number">24/7</div>
                      <div className="admin-stat-label">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="admin-cta-decoration">
          <div className="admin-cta-shape admin-shape-1"></div>
          <div className="admin-cta-shape admin-shape-2"></div>
          <div className="admin-cta-shape admin-shape-3"></div>
        </div>
      </section>

 
    </div>
  );
};

export default AdminHome;
