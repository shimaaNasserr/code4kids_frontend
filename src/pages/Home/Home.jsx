import React, { useEffect, useState } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import axiosInstance from "../../apis/config";

import img1 from '../../assets/scratch.jpg';
import img2 from '../../assets/robot.jpg';
import img3 from '../../assets/children.jpg';
import img4 from '../../assets/calculator.avif';
import img5 from '../../assets/codingg.avif';
import img6 from '../../assets/lap.avif';
import img7 from '../../assets/printing.avif';


const Home = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("userToken");


   const handleCourses = async()=>{
    let response = await  axiosInstance
    .get("courses/")
    .then((response) => {
      console.log(response.data);
       setCourses(response.data);
    })
    .catch((error) => {
      console.log(error);
      // setIsloading(false);
      // setLoginerror(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    });
  }

  useEffect(() => {
handleCourses()
 
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section py-5 position-relative overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Coding is <span className="text-gradient">Super Fun!</span> <span className="emoji">🚀</span></h1>
              <p className="lead mb-4">Learn to code through games, stories, and creative projects. Perfect for kids aged 7-14!</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
              {!token ?(
                <>
                <NavLink
                  to="/register"
                  type="button"
                  className="btn btn-lg px-4 py-3 fw-bold get-started-btn"
                >
                  Get Started
                </NavLink>

                <NavLink
                  to="/courses"
                  type="button"
                  className="btn btn-success btn-lg px-4 py-3 fw-bold"
                >
                  Explore Courses
                </NavLink>
                </>
              ):
              (
                <NavLink
                to="/courses"
                type="button"
                className="btn btn-success btn-lg px-4 py-3 fw-bold "
              >
                Explore Courses   <i className="fas fa-arrow-right"></i>
              </NavLink>
              )
            }


              </div>
              <div className="mt-4 d-flex align-items-center justify-content-center justify-content-lg-start">
                <div className="d-flex me-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" className="me-1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span>Trusted by 50,000+ young coders</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-illustration position-relative">
                <div className="character character-1">
                  <img
                    src={img1}
                    alt="Happy kid coding"
                    className="img-fluid"
                    style={{ maxWidth: '250px' }}
                  />
                </div>
                <div className="floating-element el-1">
                  <img
                    src={img2}
                    alt="Science elements"
                    width="80"
                  />
                </div>
                <div className="floating-element el-2">
                  <img
                    src={img3}
                    alt="Learning elements"
                    width="90"
                  />
                </div>
                <div className="floating-element el-3">
                  <img
                    src={img4}
                    alt="Math elements"
                    width="70"
                  />
                </div>
                <div className="code-window p-4">
                  <div className="window-controls d-flex gap-2 mb-3">
                    <span className="window-dot bg-danger"></span>
                    <span className="window-dot bg-warning"></span>
                    <span className="window-dot bg-success"></span>
                  </div>
                  <pre className="mb-0">
                    <code style={{ fontSize: "1.1rem", fontFamily: "monospace" }}>
                      <span className="text-secondary"># 🐍 Print Hello World</span>
                      <br />
                      <span className="text-success">print</span>(<span className="text-danger">"Hello World 🌍"</span>)
                      <br /><br />
                      <span className="text-secondary"># 🎯 Count from 1 to 5</span>
                      <br />
                      <span className="text-success">for</span> i <span className="text-success">in</span> <span className="text-warning">range</span>(<span className="text-danger">1</span>, <span className="text-danger">6</span>):
                      <br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-success">print</span>(i, <span className="text-danger">"⭐"</span>)
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>


   {/* Features Section */}
   <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Kids Love Learning With Us</h2>
            <p className="lead text-muted">We make coding fun, engaging, and rewarding for young minds</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card h-100 p-4 rounded-4 bg-white shadow-sm border-0 position-relative overflow-hidden">
                <div className="icon-wrapper mb-3">
                  <img
                    src={img7}
                    alt="Game controller"
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  />
                </div>
                <h4 className="h5 fw-bold mb-3">Learn Through Play</h4>
                <p className="text-muted mb-0">Fun games and interactive challenges make learning to code exciting and engaging for kids of all ages.</p>
                <div className="feature-decoration"></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100 p-4 rounded-4 bg-white shadow-sm border-0 position-relative overflow-hidden">
                <div className="icon-wrapper mb-3">
                  <img
                    src={img5}
                    alt="Real coding"
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  />
                </div>
                <h4 className="h5 fw-bold mb-3">Real Coding Skills</h4>
                <p className="text-muted mb-0">From block-based to text-based coding, we teach real programming languages used by professionals.</p>
                <div className="feature-decoration"></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card h-100 p-4 rounded-4 bg-white shadow-sm border-0 position-relative overflow-hidden">
                <div className="icon-wrapper mb-3">
                  <img
                    src={img6}
                    alt="AI Assistant"
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  />
                </div>
                <h4 className="h5 fw-bold mb-3">AI Assistant</h4>
                <p className="text-muted mb-0">Our friendly AI tutor provides instant help and encouragement whenever you're stuck.</p>
                <div className="feature-decoration"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Popular Courses */}
      <section className="courses-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Popular Courses</h2>
            <p className="lead text-muted">Start your coding journey with our most popular courses</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="course-card h-100 rounded-4 overflow-hidden shadow-sm border-0 position-relative">
                <div className="course-thumbnail bg-primary bg-opacity-10 p-5 text-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#4F46E5" className="course-icon">
                    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                    <path d="M6 9h12v2H6zm0 3h8v2H6z" />
                  </svg>
                </div>
                <div className="p-4">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-normal mb-3">Beginner</span>
                  <h3 className="h5 fw-bold mb-3">Adventures in Scratch</h3>
                  <p className="text-muted mb-4">Create your first game with block-based coding in this fun, interactive course designed for young coders.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" className="me-1">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="small text-muted">4.9 (1.2k)</span>
                    </div>
                    <NavLink to="/courses/scratch" className="btn btn-sm btn-outline-primary px-3">Start Now</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="course-card h-100 rounded-4 overflow-hidden shadow-sm border-0 position-relative">
                <div className="course-thumbnail bg-success bg-opacity-10 p-5 text-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#10B981" className="course-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                </div>
                <div className="p-4">
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-normal mb-3">Intermediate</span>
                  <h3 className="h5 fw-bold mb-3">Python for Kids</h3>
                  <p className="text-muted mb-4">Learn real programming with Python through fun projects and games. Perfect for young aspiring developers.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" className="me-1">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="small text-muted">4.8 (980)</span>
                    </div>
                    <NavLink to="/courses/python" className="btn btn-sm btn-outline-success px-3">Start Now</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="course-card h-100 rounded-4 overflow-hidden shadow-sm border-0 position-relative">
                <div className="course-thumbnail bg-warning bg-opacity-10 p-5 text-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#F59E0B" className="course-icon">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                </div>
                <div className="p-4">
                  <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-normal mb-3">Beginner</span>
                  <h3 className="h5 fw-bold mb-3">Web Wizards</h3>
                  <p className="text-muted mb-4">Build your first website with HTML & CSS. Learn the basics of web development in a fun, interactive way.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" className="me-1">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="small text-muted">4.7 (1.5k)</span>
                    </div>
                    <NavLink to="/courses/web" className="btn btn-sm btn-outline-warning px-3">Start Now</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <NavLink to="/courses" className="btn btn-outline-primary px-4 py-2 d-inline-flex align-items-center">
              View All Courses
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ms-2">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white position-relative overflow-hidden">
        <div className="container position-relative z-2">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Start Your Coding Adventure?</h2>
              <p className="lead mb-5">Join <span className="fw-bold">50,000+</span> young coders who are learning to code with our fun and interactive platform.</p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <NavLink to="/register" className="btn btn-light btn-lg px-4 py-3 fw-bold rounded-pill">
                  Start Free Trial
                </NavLink>
                <NavLink to="/courses" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
                  Explore Courses
                </NavLink>
              </div>
              <div className="mt-4 d-flex align-items-center justify-content-center">
                <div className="d-flex me-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" className="me-1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="small">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-pattern"></div>
          <div className="position-absolute top-50 start-0 translate-middle-y">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="text-primary" style={{ opacity: 0.1 }}>
              <circle cx="100" cy="100" r="100" fill="currentColor" />
            </svg>
          </div>
          <div className="position-absolute bottom-0 end-0">
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="text-warning" style={{ opacity: 0.1 }}>
              <path d="M150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section bg-dark text-white pt-5 pb-4">
        <div className="container">
          <div className="row g-4">
            {/* Logo and Tagline */}
            <div className="col-lg-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="me-2">
                  <rect width="40" height="40" rx="8" fill="#6C63FF"/>
                  <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM20 28C15.59 28 12 24.41 12 20C12 15.59 15.59 12 20 12C24.41 12 28 15.59 28 20C28 24.41 24.41 28 20 28Z" fill="white"/>
                  <path d="M20 15C17.24 15 15 17.24 15 20C15 22.76 17.24 25 20 25C22.76 25 25 22.76 25 20C25 17.24 22.76 15 20 15ZM20 23C18.34 23 17 21.66 17 20C17 18.34 18.34 17 20 17C21.66 17 23 18.34 23 20C23 21.66 21.66 23 20 23Z" fill="white"/>
                </svg>
                <h2 className="h4 mb-0 fw-bold text-gradient">Code4Kids</h2>
              </div>
              <p className="text-white mb-3">Unlock Potential, Shape the Future</p>
              <p className="small text-white">© {new Date().getFullYear()} Code4Kids</p>
              <div className="social-links d-flex gap-3 mt-3">
                <a href="#" className="text-white"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="text-white"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" className="text-white"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-md-4 col-lg-2">
              <h5 className="h6 fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Home</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Courses</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Pricing</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">About Us</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-6 col-md-4 col-lg-2">
              <h5 className="h6 fw-bold mb-3">Resources</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Tutorials</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">FAQs</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Support</a></li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="col-6 col-md-4 col-lg-2">
              <h5 className="h6 fw-bold mb-3">Contact</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="mailto:support@code4kids.com" className="text-muted text-decoration-none hover-text-white">Email support</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Contact us</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Composer Program</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Partnership & Affiliate</a></li>
              </ul>
            </div>

            {/* Legal & Language */}
            <div className="col-6 col-md-4 col-lg-2">
              <h5 className="h6 fw-bold mb-3">Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Terms of use</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Privacy policy</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-text-white">Payment policy</a></li>
              </ul>
              
              <div className="mt-4">
                <h5 className="h6 fw-bold mb-2">Language & Social</h5>
                <div className="dropdown d-inline-block">
                  <button className="btn btn-sm btn-outline-light dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    English
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                    <li><a className="dropdown-item" href="#">English</a></li>
                    <li><a className="dropdown-item" href="#">العربية</a></li>
                    <li><a className="dropdown-item" href="#">Français</a></li>
                    <li><a className="dropdown-item" href="#">Español</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-4 border-top border-secondary">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0 small text-white">© {new Date().getFullYear()} Code4Kids. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-white hover-text-white"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white hover-text-white"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white hover-text-white"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white hover-text-white"><i className="bi bi-youtube"></i></a>
                <a href="#" className="text-white hover-text-white"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
