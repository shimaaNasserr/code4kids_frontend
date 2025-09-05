import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiAlertCircle, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import axiosInstance from "../../apis/config";
import "./AdminLogin.css"; // هنضيف التنسيقات هنا

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setLoginError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    setLoginError("");
  
    try {
      const res = await axiosInstance.post("accounts/admin/login", {
        email: formData.email.trim(),
        password: formData.password,
      });
  
      const { access, refresh, user } = res.data;
      localStorage.setItem("userToken", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
  
      navigate("/admin");
    }catch (err) {
      console.error(err.response?.data); // تشوفي شكل الداتا فعليًا
    
      const errorData = err.response?.data || {};
      let errorMessage = "Login failed. Please try again.";
    
      // لو فيه رسالة في أي key من keys الشائعة
      const keysToCheck = ["detail", "message", "non_field_errors", "error"];
      for (let key of keysToCheck) {
        if (errorData[key]) {
          // لو non_field_errors array
          if (Array.isArray(errorData[key])) {
            errorMessage = errorData[key][0];
          } else {
            errorMessage = errorData[key];
          }
          break;
        }
      }
    
      // لو فيه أي key تاني فيها string نقدر ناخدها كرسالة fallback
      if (typeof errorData === "object") {
        const otherKey = Object.keys(errorData).find(
          k => typeof errorData[k] === "string"
        );
        if (otherKey) errorMessage = errorData[otherKey];
      }
    
      setLoginError(errorMessage);
    }
     finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="admin-login d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 admin-login-card">
        <div className="card-header text-center text-white bg-primary">
          <h4 className="mb-0">Admin Login</h4>
          <small>Sign in to continue</small>
        </div>

        <div className="card-body">
          {loginError && (
            <div className="alert alert-danger d-flex align-items-center">
              <FiAlertCircle className="me-2" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FiMail />
                </span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FiLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <FiLogIn className="me-2" />
              )}
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="card-footer text-center small text-muted">
          © {new Date().getFullYear()} Code4Kids. All rights reserved.
        </div>
      </div>
    </div>
  );
}
