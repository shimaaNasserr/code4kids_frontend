import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../apis/config";
import "./Login.css";
import googleIcon from '../../assets/google-icon.svg';
import loginIllustration from '../../assets/login-illustration.svg';
import img1 from '../../assets/loginandregister.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (values) => {
    setIsLoading(true);
    setLoginError(null);

    axiosInstance
      .post("accounts/login/", values) 
      .then((response) => {
        console.log(response);
        if (response.data.message === "Login successful") {
          localStorage.setItem("userToken", response?.data?.tokens?.access);
          localStorage.setItem("refresh_token", response?.data?.tokens?.refresh);
          localStorage.setItem("userId", response?.data?.user?.id);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError(
          error.response?.data?.message ||
            "Login failed. Please check your credentials and try again."
        );
      })
      .finally(() => setIsLoading(false));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9@#$%^&*]{6,11}$/,
        "Password must be 6–11 characters long, and may include @#$%^&*"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const handleGoogleLogin = () => {
    // window.location.href = 'http://localhost:8000/accounts/google/login/';
    window.location.href = 'www.google.com';

  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Illustration Section - Hidden on mobile */}
        <div className="login-illustration">
          <img 
            src={img1}
            alt="Kids coding together" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = {img1};
            }}
          />
        </div>

        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back! 👋</h2>
            <p>Ready to continue your coding adventure?</p>
          </div>

          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          )}

          {/* Google Sign In Button */}
          <button 
            type="button" 
            className="google-signin" 
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="Google" />
            Continue with Google
          </button>

          <div className="divider">or</div>

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
                className={`form-control ${
                  formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
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
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-group m-auto">
              <button
                type="submit"
                className="btn-primary w-100 m-auto"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="text-center ">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="signup-link text-center">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="forgot-password text-center ">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
