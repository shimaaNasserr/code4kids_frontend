import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaHeart, FaRocket, FaStar, FaGraduationCap, FaLightbulb, FaGamepad, FaPalette, FaDatabase, FaMobile, FaGlobe } from 'react-icons/fa';
import './OurTeam.css';

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Shimaa Nasser",
      role: "Project Lead & Frontend Developer",
      avatar: "👩‍💻",
      color: "#E6396A",
      specialization: {
        title: "Leadership & React Development",
        description: "Leading the team with expertise in React, project management, and user experience design."
      },
      description: "Passionate about creating educational technology that makes learning programming accessible and fun for children. Combines technical expertise with educational insights.",
      skills: ["React", "Leadership", "UI/UX", "Project Management"]
    },
    {
      id: 2,
      name: "Rahma Atef",
      role: "Backend Developer",
      avatar: "👩‍🔧",
      color: "#009688",
      specialization: {
        title: "Backend Architecture & APIs",
        description: "Specializes in building robust backend systems and APIs that power our educational platform."
      },
      description: "Expert in server-side development with a focus on creating scalable and secure systems for educational applications.",
      skills: ["Django", "Python", "APIs", "Database Design"]
    },
    {
      id: 3,
      name: "Yara Youssef",
      role: "UI/UX Designer",
      avatar: "🎨",
      color: "#20C997",
      specialization: {
        title: "Child-Centered Design",
        description: "Creates engaging and intuitive interfaces specifically designed for children's learning experiences."
      },
      description: "Passionate about designing user experiences that make complex programming concepts accessible and enjoyable for young learners.",
      skills: ["Figma", "Child Psychology", "Visual Design", "Prototyping"]
    },
    {
      id: 4,
      name: "Mohamed Al-Alfy",
      role: "Full Stack Developer",
      avatar: "👨‍💻",
      color: "#FFD700",
      specialization: {
        title: "Full Stack Development",
        description: "Works across frontend and backend to ensure seamless integration and optimal performance."
      },
      description: "Versatile developer with expertise in both frontend and backend technologies, ensuring cohesive platform development.",
      skills: ["React", "Django", "JavaScript", "System Integration"]
    },
    {
      id: 5,
      name: "Mohamed Al-Hadidy",
      role: "Game Developer",
      avatar: "🎮",
      color: "#9C27B0",
      specialization: {
        title: "Educational Game Development",
        description: "Develops interactive coding games that make learning programming fun and engaging for children."
      },
      description: "Specializes in creating gamified learning experiences that combine entertainment with educational value.",
      skills: ["Game Design", "Animation", "Interactive Media", "Child Engagement"]
    },
    {
      id: 6,
      name: "Abdelrahman Ghoneim",
      role: "DevOps Engineer",
      avatar: "⚙️",
      color: "#FF5722",
      specialization: {
        title: "Infrastructure & Deployment",
        description: "Manages platform infrastructure, deployment, and ensures reliable performance for all users."
      },
      description: "Ensures the platform runs smoothly and securely, managing deployment processes and system reliability.",
      skills: ["Cloud Computing", "CI/CD", "System Administration", "Security"]
    }
  ];

  const teamValues = [
    {
      icon: <FaHeart />,
      title: "Child-First Approach",
      description: "Every decision we make prioritizes the learning experience and well-being of children"
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation in Education",
      description: "We constantly explore new ways to make programming education more effective and engaging"
    },
    {
      icon: <FaUsers />,
      title: "Collaborative Learning",
      description: "We believe in the power of teamwork, both in our development process and in teaching children"
    },
    {
      icon: <FaRocket />,
      title: "Continuous Growth",
      description: "We're committed to constantly improving our platform and expanding our impact"
    }
  ];

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero-section">
        <div className="team-hero-background">
          <div className="team-floating-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="team-particle"
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
        
        <div className="team-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="team-hero-text"
          >
            <h1 className="team-hero-title">
              Meet Our Team
            </h1>
            <p className="team-hero-subtitle">
              Passionate educators and developers from ITI, dedicated to making programming accessible for every child
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="team-hero-stats"
          >
            <div className="team-stat-item">
              <span className="team-stat-number">6</span>
              <span className="team-stat-label">Team Members</span>
            </div>
            <div className="team-stat-item">
              <span className="team-stat-number">ITI</span>
              <span className="team-stat-label">Training Excellence</span>
            </div>
            <div className="team-stat-item">
              <span className="team-stat-number">100%</span>
              <span className="team-stat-label">Dedicated</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-content-section team-members">
        <div className="team-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="team-section-header"
          >
            <h2 className="team-section-title">Our Amazing Team</h2>
            <p className="team-section-subtitle">Meet the talented individuals behind Code4Kids</p>
          </motion.div>
          
          <div className="team-members-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="team-member-card"
                style={{ '--member-color': member.color }}
              >
                <div className="team-member-avatar">
                  <span className="team-avatar-emoji">{member.avatar}</span>
                  <div className="team-avatar-ring"></div>
                </div>
                
                <div className="team-member-info">
                  <h3 className="team-member-name">
                    {member.name}
                  </h3>
                  
                  <div className="team-member-role">
                    <div className="team-role-en">{member.role}</div>
                  </div>
                  
                  <div className="team-member-specialization">
                    <h4>{member.specialization.title}</h4>
                    <p>{member.specialization.description}</p>
                  </div>
                  
                  <div className="team-member-description">
                    <p className="team-desc-en">{member.description}</p>
                  </div>
                  
                  <div className="team-member-skills">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="team-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="team-member-decoration">
                  <div className="team-decoration-circle"></div>
                  <div className="team-decoration-triangle"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="team-content-section team-values">
        <div className="team-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="team-section-header"
          >
            <h2 className="team-section-title">Our Values</h2>
          </motion.div>
          
          <div className="team-values-grid">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="team-value-card"
              >
                <div className="team-card-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="team-content-section team-cta">
        <div className="team-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="team-cta-content"
          >
            <h2>Ready to Join Our Mission?</h2>
            <p>Help us shape the future of programming education for children</p>
            <div className="team-cta-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="team-cta-btn team-primary"
              >
                <FaRocket />
                Start Learning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="team-cta-btn team-secondary"
              >
                <FaUsers />
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
