import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit3, Star, Award, BookOpen, Target, Camera } from 'lucide-react';
import './Profile.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setUserData({
        user_info: {
          id: 1,
          username: "rahma_kid",
          first_name: "Rahma",
          last_name: "Atef",
          email: "ahmed@gmail.com",
          role: "Kid",
          phone_number: "01234567890"
        },
        profile_info: {
          avatar: null,
          bio: "I love learning programming and playing with code! 🚀",
          age: 12,
          favorite_language: "Python",
          skill_level: "Beginner",
          points: 250,
          courses_completed: 2,
          badges: ["first_lesson", "python_master"]
        },
        learning_stats: {
          total_enrolled_courses: 3,
          total_completed_lessons: 15,
          average_progress: 65.5,
          current_courses: [
            {
              course_id: 1,
              course_title: "Python for Beginners",
              course_image: null,
              progress_percentage: 80,
              total_lessons: 10,
              completed_lessons: 8
            },
            {
              course_id: 2,
              course_title: "JavaScript Basics",
              course_image: null,
              progress_percentage: 45,
              total_lessons: 12,
              completed_lessons: 5
            }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-box">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const { user_info, profile_info, learning_stats } = userData;

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-header-content">

            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-container">
                {profile_info.avatar ? (
                  <img 
                    src={profile_info.avatar} 
                    alt="Profile" 
                    className="avatar-image"
                  />
                ) : (
                  <span className="avatar-letter">{user_info.first_name.charAt(0)}</span>
                )}
              </div>
              <button className="camera-btn">
                <Camera size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="user-info">
              <div className="user-name-section">
                <h1 className="user-name">
                  {user_info.first_name} {user_info.last_name}
                </h1>
                <div className="user-role">
                  {user_info.role === 'Kid' ? 'Student' : 'Parent'}
                </div>
              </div>
              
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>{user_info.email}</span>
                </div>
                {user_info.phone_number && (
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{user_info.phone_number}</span>
                  </div>
                )}
              </div>

              <p className="user-bio">{profile_info.bio}</p>
              
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-btn"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon yellow">
                <Star size={24} />
              </div>
              <div className="stat-info">
                <h3>Points</h3>
                <p className="stat-number yellow">{profile_info.points}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon green">
                <Award size={24} />
              </div>
              <div className="stat-info">
                <h3>Completed Courses</h3>
                <p className="stat-number green">{profile_info.courses_completed}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon blue">
                <BookOpen size={24} />
              </div>
              <div className="stat-info">
                <h3>Completed Lessons</h3>
                <p className="stat-number blue">{learning_stats?.total_completed_lessons || 0}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon purple">
                <Target size={24} />
              </div>
              <div className="stat-info">
                <h3>Average Progress</h3>
                <p className="stat-number purple">{Math.round(learning_stats?.average_progress || 0)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Courses */}
        {learning_stats && learning_stats.current_courses && (
          <div className="courses-section">
            <h2 className="section-title">
              <BookOpen className="title-icon" />
              Current Courses
            </h2>
            
            <div className="courses-list">
              {learning_stats.current_courses.map((course) => (
                <div key={course.course_id} className="course-card">
                  <div className="course-header">
                    <h3 className="course-title">{course.course_title}</h3>
                    <span className="course-badge">
                      {course.completed_lessons}/{course.total_lessons} Lessons
                    </span>
                  </div>
                  
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="course-stats">
                    <span>Progress: {course.progress_percentage}%</span>
                    <span>Remaining: {course.total_lessons - course.completed_lessons} Lessons</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Details */}
        <div className="details-section">
          <h2 className="section-title">
            <User className="title-icon" />
            Personal Details
          </h2>
          
          <div className="details-grid">
            <div className="details-column">
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{profile_info.age || 'Not specified'} years</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Favorite Language:</span>
                <span className="detail-badge blue">
                  {profile_info.favorite_language || 'Not specified'}
                </span>
              </div>
            </div>
            
            <div className="details-column">
              <div className="detail-item">
                <span className="detail-label">Skill Level:</span>
                <span className="detail-badge green">
                  {profile_info.skill_level === 'Beginner' ? 'Beginner' : 
                   profile_info.skill_level === 'Intermediate' ? 'Intermediate' : 'Advanced'}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Badges:</span>
                <span className="detail-value">{profile_info.badges.length} Badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;





