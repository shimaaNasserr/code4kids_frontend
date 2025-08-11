import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../apis/config";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  let [loginerror, setLoginerror] = useState(null);
  const [isloading, setIsloading] = useState(false);

  let handleLogin = (values) => {
    setIsloading(true);
    setLoginerror(null);
    
    axiosInstance
      .post("/accounts/login/", values)
      .then((response) => {
        console.log(response);
        if (response.data.message === "Login successful") {
          localStorage.setItem("userToken", response?.data?.tokens?.access);
          localStorage.setItem("refresh_token", response?.data?.tokens?.refresh);
          localStorage.setItem("userId", response?.data?.user?.id);
          setIsloading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
        setLoginerror(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
      });
  };

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9@#$%^&*]{5,15}$/,
        "Password must be 6–11 characters long, and must include @#$%^&*"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back! 👋</h2>
            <p>Ready to continue your coding adventure?</p>
          </div>
          
          {loginerror && <div className="alert alert-danger" role="alert">{loginerror}</div>}
          
          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="your.email@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isloading}>
              {isloading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="register-link">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
