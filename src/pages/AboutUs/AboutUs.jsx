import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaGamepad, FaRobot, FaUsers, FaGraduationCap, FaHeart, FaStar, FaCode, FaPuzzlePiece, FaChild, FaGlobe, FaLightbulb } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  const features = [
    {
      icon: <FaGamepad />,
      title: "Interactive Learning",
      description: "Learn programming through fun games and interactive activities designed for kids"
    },
    {
      icon: <FaRobot />,
      title: "AI Assistant",
      description: "Get personalized help and guidance from our friendly AI coding companion"
    },
    {
      icon: <FaPuzzlePiece />,
      title: "Visual Programming",
      description: "Drag and drop coding blocks to create programs without typing complex code"
    },
    {
      icon: <FaUsers />,
      title: "Safe Environment",
      description: "A secure, child-friendly platform with parental controls and monitoring"
    }
  ];

  const stats = [
    {
      number: "7-14",
      label: "Age Range",
      icon: <FaChild />
    },
    {
      number: "100+",
      label: "Interactive Lessons",
      icon: <FaGraduationCap />
    },
    {
      number: "50+",
      label: "Coding Games",
      icon: <FaGamepad />
    },
    {
      number: "24/7",
      label: "AI Support",
      icon: <FaRobot />
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-background">
          <div className="about-floating-particles">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="about-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-text"
          >
            <h1 className="about-hero-title">
              About Code4Kids
            </h1>
            <p className="about-hero-subtitle">
              An innovative educational platform that makes programming fun and accessible for children aged 7-14
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="about-hero-stats"
          >
            {stats.map((stat, index) => (
              <div key={index} className="about-stat-item">
                <div className="about-stat-icon">{stat.icon}</div>
                <span className="about-stat-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-content-section about-mission">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-section-header"
          >
            <h2 className="about-section-title">Our Mission</h2>
            <p className="about-section-subtitle">Empowering the next generation with coding skills</p>
          </motion.div>
          
          <div className="about-mission-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="about-mission-text"
            >
              <div className="about-mission-card">
                <FaLightbulb className="about-mission-icon" />
                <h3>Our Vision</h3>
                <p>
                  To create a world where every child has the opportunity to learn programming in a fun, 
                  engaging, and age-appropriate way. We believe coding is not just about technology - 
                  it's about problem-solving, creativity, and logical thinking.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="about-mission-text"
            >
              <div className="about-mission-card">
                <FaHeart className="about-mission-icon" />
                <h3>Our Approach</h3>
                <p>
                  We use gamification, visual programming, and AI assistance to make learning enjoyable. 
                  Our platform adapts to each child's learning pace and provides personalized feedback 
                  to ensure continuous progress and motivation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-content-section about-features">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-section-header"
          >
            <h2 className="about-section-title">Platform Features</h2>
          </motion.div>
          
          <div className="about-features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="about-feature-card"
              >
                <div className="about-feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-content-section about-story">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-section-header"
          >
            <h2 className="about-section-title">Our Story</h2>
          </motion.div>
          
          <div className="about-story-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="about-story-card"
            >
              <div className="about-story-header">
                <FaGraduationCap className="about-story-icon" />
                <h3>Born from ITI Training Excellence</h3>
              </div>
              <div className="about-story-text">
                <p>
                  Code4Kids was created by a passionate team of developers and educators from the 
                  Information Technology Institute (ITI). Recognizing the growing importance of 
                  digital literacy and the need to start coding education early, we developed 
                  this platform to bridge the gap between complex programming concepts and 
                  child-friendly learning experiences.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-content-section about-cta">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-cta-content"
          >
            <h2>Ready to Start the Coding Journey?</h2>
            <p>Join thousands of children who are already learning to code with Code4Kids</p>
            <div className="about-cta-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="about-cta-btn about-primary"
              >
                <FaRocket />
                Start Learning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="about-cta-btn about-secondary"
              >
                <FaUsers />
                Meet Our Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
