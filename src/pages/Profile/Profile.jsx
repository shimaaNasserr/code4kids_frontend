
import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Edit3, Star, Award, 
  BookOpen, Target, Camera, AlertCircle, X 
} from 'lucide-react';
import ProfileAPI from '../../services/profileAPI';
import './Profile.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: ''
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('userToken');
        if (!token) {
          setError('Please login first');
          setLoading(false);
          return;
        }

        const data = await ProfileAPI.getProfileDashboard();
        setUserData(data);
        console.log('User Info:', data.user_info);
        setFormData({
          first_name: data.user_info.first_name || '',
          last_name: data.user_info.last_name || '',
          bio: data.profile_info.bio || ''
        });

      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Upload avatar
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert('Please select JPG, PNG or GIF image');
      return;
    }

    if (file.size > maxSize) {
      alert('Image size is too large. Max 5MB allowed');
      return;
    }

    try {
      setAvatarLoading(true);
      const response = await ProfileAPI.uploadAvatar(file);

      setUserData(prevData => ({
        ...prevData,
        profile_info: {
          ...prevData.profile_info,
          avatar: response.avatar_url
        }
      }));

      alert('Avatar uploaded successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  // Update profile form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await ProfileAPI.updateProfile(formData);
      setUserData(prev => ({
        ...prev,
        user_info: {
          ...prev.user_info,
          first_name: formData.first_name,
          last_name: formData.last_name
        },
        profile_info: {
          ...prev.profile_info,
          bio: formData.bio
        }
      }));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
    }
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <AlertCircle size={48} className="error-icon" />
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data
  if (!userData) {
    return (
      <div className="error-container">
        <div className="error-box">
          <User size={48} className="error-icon" />
          <h2>No Data</h2>
          <p>No profile data found</p>
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
                  <img src={profile_info.avatar} alt="Profile" className="avatar-image" />
                ) : (
                  <span className="avatar-letter">
                    {user_info.first_name ? user_info.first_name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
                {avatarLoading && (
                  <div className="avatar-loading">
                    <div className="loading-spinner small"></div>
                  </div>
                )}
              </div>

              <label className="camera-btn" htmlFor="avatar-upload">
                <Camera size={16} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                  disabled={avatarLoading}
                />
              </label>
            </div>

            {/* User Info */}
            <div className="user-info">
              <div className="user-name-section">
                <h1 className="user-name">
                  {user_info.first_name || user_info.username} {user_info.last_name || ''}
                </h1>

                {user_info.role === 'Kid' && user_info.child_code && (
                  <div className="child-code-wrapper">
                    <span className="child-code-text">{user_info.child_code}</span>
                    <button 
                      className="copy-code-btn"
                      onClick={() => navigator.clipboard.writeText(user_info.child_code)}
                      title="Copy code"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                )}

                <div className="user-role">
                  {user_info.role === 'Kid' ? 'Student' :
                   user_info.role === 'Parent' ? 'Parent' : 'Admin'}
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

              {profile_info.bio && (
                <p className="user-bio">{profile_info.bio}</p>
              )}
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon yellow"><Star size={24} /></div>
              <div className="stat-info">
                <h3>Points</h3>
                <p className="stat-number yellow">{profile_info.points || 0}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon green"><Award size={24} /></div>
              <div className="stat-info">
                <h3>Completed Courses</h3>
                <p className="stat-number green">{profile_info.courses_completed || 0}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon blue"><BookOpen size={24} /></div>
              <div className="stat-info">
                <h3>Completed Lessons</h3>
                <p className="stat-number blue">{learning_stats?.total_completed_lessons || 0}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon purple"><Target size={24} /></div>
              <div className="stat-info">
                <h3>Average Progress</h3>
                <p className="stat-number purple">{Math.round(learning_stats?.average_progress || 0)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Courses */}
        {learning_stats && learning_stats.current_courses?.length > 0 && (
          <div className="courses-section">
            <h2 className="section-title">
              <BookOpen className="title-icon" /> Current Courses
            </h2>

            <div className="courses-list">
              {learning_stats.current_courses.map((course) => (
                <div key={course.course_id} className="course-card">
                  <div className="course-header">
                    <h3 className="course-title">{course.course_title}</h3>
                    <span className="course-badge">
                      {course.completed_lessons}/{course.total_lessons} lessons
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
                    <span>Remaining: {course.total_lessons - course.completed_lessons} lessons</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Children Section */}
        {user_info.role === 'Parent' && userData.children?.length > 0 && (
          <div className="children-section">
            <h2 className="section-title">
              <User className="title-icon" /> Children
            </h2>

            <div className="children-list">
              {userData.children.map((child) => (
                <div key={child.kid_id} className="child-card">
                  <h3 className="child-name">{child.kid_name}</h3>
                  <div className="child-stats">
                    <div className="child-stat">
                      <BookOpen size={16} />
                      <span>{child.total_courses} courses</span>
                    </div>
                    <div className="child-stat">
                      <Award size={16} />
                      <span>{child.total_completed_lessons} lessons</span>
                    </div>
                    <div className="child-stat">
                      <Star size={16} />
                      <span>{child.kid_points} points</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Details */}
        <div className="details-section">
          <h2 className="section-title">
            <User className="title-icon" /> Personal Details
          </h2>

          <div className="details-grid">
            <div className="details-column">
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{profile_info.age || 'Not set'} years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Favorite Language:</span>
                <span className="detail-badge blue">
                  {profile_info.favorite_language || 'Not set'}
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
                <span className="detail-value">{profile_info.badges ? profile_info.badges.length : 0} badges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="edit-form-overlay">
            <div className="edit-form-box">
              <button className="close-btn" onClick={() => setIsEditing(false)}>
                <X size={20} />
              </button>
              <h3>Edit Profile</h3>
              <form onSubmit={handleFormSubmit} className="edit-form">
                <label>First Name</label>
                <input 
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
                <label>Last Name</label>
                <input 
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />
                <label>Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
                <button type="submit" className="save-btn">Save</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;


