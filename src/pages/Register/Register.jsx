import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../apis/config'
import './Register.css' 

const Register = () => {
  let navigate = useNavigate()

  let validationSchema = Yup.object({
    username: Yup.string().min(3, 'min length 3').max(20, 'max length 20').required('Please enter your username'),
    email: Yup.string().email('Invalid email').required('Please enter your email'),
    phone_number: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone number must be egyptian number').required('Phone number is required'),
    password: Yup.string()
      .matches(/^[A-Za-z0-9@#$%^&*]{5,15}$/, 'Password must be 6–11 characters long, and must include @#$%^&*')
      .required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
    role: Yup.string().required('Please select a role')
  })

  const [apiError, setApiError] = useState(null)
  const [isloading, setIsloading] = useState(false)
  const roles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Kid', label: 'Kid' }
  ]

  function handelRegister(formValues) {
    setIsloading(true)
    setApiError(null)
    
    console.log(formValues);
    axiosInstance.post('accounts/register/', formValues)
      .then((res) => {
        console.log(res);
        if (res?.data?.message === 'User Registered') {
          setIsloading(false)
          navigate('/login');
        }
      })
      .catch((error) => {
        setIsloading(false)
        if (error.response?.data?.message) {
          setApiError(error.response.data.message)
        } else if (error.response?.data?.error) {
          setApiError(error.response.data.error)
        } else {
          setApiError('Registration failed. Please try again.')
        }
        console.log(error);
      })
  }

  let formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: '',
      role: ""
    },
    validationSchema: validationSchema,
    onSubmit: handelRegister
  })

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>Create Your Account</h2>
            <p>Join our coding adventure! 🚀</p>
          </div>
          
          {apiError && <div className="alert alert-danger" role="alert">{apiError}</div>}
          
          <form onSubmit={formik.handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                placeholder="Choose a fun username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
            </div>

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
                placeholder="Create a strong password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
                className={`form-control ${formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''}`}
                placeholder="Type your password again"
              />
              {formik.touched.confirm_password && formik.errors.confirm_password && (
                <div className="error-message">{formik.errors.confirm_password}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                className={`form-control ${formik.touched.phone_number && formik.errors.phone_number ? 'is-invalid' : ''}`}
                placeholder="01XXXXXXXXX"
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <div className="error-message">{formik.errors.phone_number}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">I am a</label>
              <select
                id="role"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                className={`form-control ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="error-message">{formik.errors.role}</div>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isloading}>
              {isloading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Start Coding!'
              )}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register