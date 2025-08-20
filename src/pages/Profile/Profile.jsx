// // import React from 'react'

// // export const Profile = () => {
// //   return (
// //     <div className='d-flex justify-content-center align-items-center my-5 py-5'>Profile</div>
// //   )
// // }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../apis/config";
// import "./Profile.css";
// import defaultAvatar from '../../assets/default-avatar.png'; // ضيف صورة default

// const Profile = () => {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   // Form state for editing
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     phone_number: "",
//     bio: "",
//     grade_level: "",
//     school_name: "",
//     favorite_programming_language: "",
//     programming_experience: "beginner"
//   });

//   // Fetch user profile on component mount
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem("userToken");
      
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const response = await axiosInstance.get("accounts/profile/", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.data.message === "Profile retrieved successfully") {
//         const userData = response.data.data;
//         setUserProfile(userData);
        
//         // Set form data for editing
//         setFormData({
//           first_name: userData.first_name || "",
//           last_name: userData.last_name || "",
//           phone_number: userData.phone_number || "",
//           bio: userData.profile?.bio || "",
//           grade_level: userData.profile?.grade_level || "",
//           school_name: userData.profile?.school_name || "",
//           favorite_programming_language: userData.profile?.favorite_programming_language || "",
//           programming_experience: userData.profile?.programming_experience || "beginner"
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("userToken");
//         navigate("/login");
//       } else {
//         setError("Failed to load profile. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem("userToken");

//       const response = await axiosInstance.put(
//         "accounts/profile/update/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.message === "Profile updated successfully") {
//         setUserProfile(response.data.data);
//         setIsEditing(false);
//         setError(null);
//         // Show success message
//         alert("Profile updated successfully! 🎉");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Failed to update profile. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Check file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert("File size should be less than 5MB");
//       return;
//     }

//     // Check file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.type)) {
//       alert("Please select a valid image file (JPEG, PNG, GIF)");
//       return;
//     }

//     try {
//       setUploadingImage(true);
//       const token = localStorage.getItem("userToken");
      
//       const formData = new FormData();
//       formData.append('profile_picture', file);

//       const response = await axiosInstance.post(
//         "accounts/profile/upload-image/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.message === "Profile picture uploaded successfully") {
//         // Refresh profile to get updated image
//         await fetchUserProfile();
//         alert("Profile picture updated successfully! 📸");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image. Please try again.");
//     } finally {
//       setUploadingImage(false);
//       // Reset file input
//       e.target.value = '';
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   if (isLoading && !userProfile) {
//     return (
//       <div className="profile-loading">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p>Loading your profile...</p>
//       </div>
//     );
//   }

//   if (error && !userProfile) {
//     return (
//       <div className="profile-error">
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//         <button className="btn btn-primary" onClick={fetchUserProfile}>
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-page">
//       <div className="profile-container">
//         <div className="profile-header">
//           <div className="profile-header-content">
//             <h1>My Profile 👤</h1>
//             <p>Manage your coding journey information</p>
//           </div>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         {error && (
//           <div className="alert alert-danger" role="alert">
//             {error}
//           </div>
//         )}

//         <div className="profile-content">
//           {/* Profile Picture Section */}
//           <div className="profile-picture-section">
//             <div className="profile-picture-container">
//               <img
//                 src={userProfile?.profile?.profile_picture || defaultAvatar}
//                 alt="Profile"
//                 className="profile-picture"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = defaultAvatar;
//                 }}
//               />
//               {uploadingImage && (
//                 <div className="profile-picture-overlay">
//                   <div className="spinner-border spinner-border-sm text-white" role="status">
//                     <span className="visually-hidden">Uploading...</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="profile-picture-actions">
//               <label htmlFor="profile-image-upload" className="btn btn-outline-primary btn-sm">
//                 📷 Change Photo
//               </label>
//               <input
//                 id="profile-image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: 'none' }}
//                 disabled={uploadingImage}
//               />
//               <p className="text-muted small">
//                 Max size: 5MB. Formats: JPEG, PNG, GIF
//               </p>
//             </div>
//           </div>

//           {/* Profile Information */}
//           <div className="profile-info-section">
//             <div className="profile-info-header">
//               <h3>Profile Information</h3>
//               <button
//                 className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} btn-sm`}
//                 onClick={() => setIsEditing(!isEditing)}
//                 disabled={isLoading}
//               >
//                 {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
//               </button>
//             </div>

//             {isEditing ? (
//               // Edit Form
//               <form onSubmit={handleUpdateProfile} className="profile-form">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="first_name">First Name</label>
//                       <input
//                         id="first_name"
//                         name="first_name"
//                         type="text"
//                         className="form-control"
//                         value={formData.first_name}
//                         onChange={handleInputChange}
//                         placeholder="Enter your first name"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="last_name">Last Name</label>
//                       <input
//                         id="last_name"
//                         name="last_name"
//                         type="text"
//                         className="form-control"
//                         value={formData.last_name}
//                         onChange={handleInputChange}
//                         placeholder="Enter your last name"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone_number">Phone Number</label>
//                   <input
//                     id="phone_number"
//                     name="phone_number"
//                     type="tel"
//                     className="form-control"
//                     value={formData.phone_number}
//                     onChange={handleInputChange}
//                     placeholder="Enter your phone number"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="bio">Bio</label>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     className="form-control"
//                     rows="3"
//                     value={formData.bio}
//                     onChange={handleInputChange}
//                     placeholder="Tell us about yourself..."
//                     maxLength="500"
//                   />
//                   <small className="text-muted">
//                     {formData.bio.length}/500 characters
//                   </small>
//                 </div>

//                 {userProfile?.role === 'Kid' && (
//                   <>
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label htmlFor="grade_level">Grade Level</label>
//                           <input
//                             id="grade_level"
//                             name="grade_level"
//                             type="text"
//                             className="form-control"
//                             value={formData.grade_level}
//                             onChange={handleInputChange}
//                             placeholder="e.g., 6th Grade"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label htmlFor="school_name">School Name</label>
//                           <input
//                             id="school_name"
//                             name="school_name"
//                             type="text"
//                             className="form-control"
//                             value={formData.school_name}
//                             onChange={handleInputChange}
//                             placeholder="Your school name"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label htmlFor="favorite_programming_language">Favorite Language</label>
//                           <select
//                             id="favorite_programming_language"
//                             name="favorite_programming_language"
//                             className="form-control"
//                             value={formData.favorite_programming_language}
//                             onChange={handleInputChange}
//                           >
//                             <option value="">Select a language</option>
//                             <option value="Python">Python</option>
//                             <option value="JavaScript">JavaScript</option>
//                             <option value="Java">Java</option>
//                             <option value="C++">C++</option>
//                             <option value="Scratch">Scratch</option>
//                             <option value="HTML/CSS">HTML/CSS</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label htmlFor="programming_experience">Experience Level</label>
//                           <select
//                             id="programming_experience"
//                             name="programming_experience"
//                             className="form-control"
//                             value={formData.programming_experience}
//                             onChange={handleInputChange}
//                           >
//                             <option value="beginner">🌱 Beginner</option>
//                             <option value="intermediate">🚀 Intermediate</option>
//                             <option value="advanced">⭐ Advanced</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 <div className="form-actions">
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Saving...' : '💾 Save Changes'}
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setIsEditing(false)}
//                     disabled={isLoading}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               // Display Mode
//               <div className="profile-display">
//                 <div className="profile-stats">
//                   <div className="stat-card">
//                     <h4>{userProfile?.profile?.courses_completed || 0}</h4>
//                     <p>Courses Completed</p>
//                   </div>
//                   <div className="stat-card">
//                     <h4>{userProfile?.profile?.total_study_hours || 0}h</h4>
//                     <p>Study Hours</p>
//                   </div>
//                   <div className="stat-card">
//                     <h4>{userProfile?.role}</h4>
//                     <p>Account Type</p>
//                   </div>
//                 </div>

//                 <div className="profile-details">
//                   <div className="detail-group">
//                     <h5>🔹 Personal Information</h5>
//                     <div className="detail-item">
//                       <span className="label">Name:</span>
//                       <span className="value">
//                         {userProfile?.first_name || userProfile?.last_name 
//                           ? `${userProfile.first_name} ${userProfile.last_name}`.trim()
//                           : "Not provided"}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Email:</span>
//                       <span className="value">{userProfile?.email}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Phone:</span>
//                       <span className="value">{userProfile?.phone_number || "Not provided"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Bio:</span>
//                       <span className="value">
//                         {userProfile?.profile?.bio || "No bio provided yet. Tell us about yourself!"}
//                       </span>
//                     </div>
//                   </div>

//                   {userProfile?.role === 'Kid' && (
//                     <div className="detail-group">
//                       <h5>🎓 Learning Information</h5>
//                       <div className="detail-item">
//                         <span className="label">Grade Level:</span>
//                         <span className="value">{userProfile?.profile?.grade_level || "Not specified"}</span>
//                       </div>
//                       <div className="detail-item">
//                         <span className="label">School:</span>
//                         <span className="value">{userProfile?.profile?.school_name || "Not specified"}</span>
//                       </div>
//                       <div className="detail-item">
//                         <span className="label">Favorite Language:</span>
//                         <span className="value">
//                           {userProfile?.profile?.favorite_programming_language || "Not selected yet"}
//                         </span>
//                       </div>
//                       <div className="detail-item">
//                         <span className="label">Experience:</span>
//                         <span className="value experience-badge">
//                           {userProfile?.profile?.programming_experience === 'beginner' && '🌱 Beginner'}
//                           {userProfile?.profile?.programming_experience === 'intermediate' && '🚀 Intermediate'}
//                           {userProfile?.profile?.programming_experience === 'advanced' && '⭐ Advanced'}
//                           {!userProfile?.profile?.programming_experience && 'Not specified'}
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="detail-group">
//                     <h5>⏰ Account Information</h5>
//                     <div className="detail-item">
//                       <span className="label">Member Since:</span>
//                       <span className="value">
//                         {userProfile?.profile?.created_at 
//                           ? new Date(userProfile.profile.created_at).toLocaleDateString()
//                           : "Recently joined"}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Last Updated:</span>
//                       <span className="value">
//                         {userProfile?.profile?.updated_at 
//                           ? new Date(userProfile.profile.updated_at).toLocaleDateString()
//                           : "Never"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import './Profile.css';

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile data from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch('/api/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add authorization header if needed
//             // 'Authorization': `Bearer ${token}`
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }

//         const data = await response.json();
//         setProfileData(data.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-spinner"></div>
//         <p>جاري تحميل البروفايل...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="profile-error">
//         <h2>عذراً، حدث خطأ!</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>
//           إعادة المحاولة
//         </button>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="profile-error">
//         <h2>لم يتم العثور على البيانات</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           {profileData.profile?.profile_picture ? (
//             <img 
//               src={profileData.profile.profile_picture} 
//               alt="صورة شخصية"
//               className="avatar-image"
//             />
//           ) : (
//             <div className="avatar-placeholder">
//               <span className="avatar-initial">
//                 {profileData.first_name ? profileData.first_name[0].toUpperCase() : 'U'}
//               </span>
//             </div>
//           )}
//         </div>
        
//         <div className="profile-info">
//           <h1 className="profile-name">
//             {profileData.first_name} {profileData.last_name}
//           </h1>
//           <p className="profile-username">@{profileData.username}</p>
//           <p className="profile-role">{profileData.role === 'kid' ? 'طفل مبرمج' : profileData.role}</p>
//         </div>
//       </div>

//       <div className="profile-stats">
//         <div className="stat-card">
//           <h3>الكورسات المكتملة</h3>
//           <span className="stat-number">{profileData.courses_completed || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>ساعات الدراسة</h3>
//           <span className="stat-number">{profileData.total_study_hours || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>مستوى الخبرة</h3>
//           <span className="stat-level">{profileData.programming_experience || 'مبتدئ'}</span>
//         </div>
//       </div>

//       <div className="profile-details">
//         <div className="detail-section">
//           <h2>معلومات شخصية</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأول:</span>
//               <span className="detail-value">{profileData.first_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأخير:</span>
//               <span className="detail-value">{profileData.last_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">البريد الإلكتروني:</span>
//               <span className="detail-value">{profileData.email}</span>
//             </div>
            
//             {profileData.phone_number && (
//               <div className="detail-item">
//                 <span className="detail-label">رقم الهاتف:</span>
//                 <span className="detail-value">{profileData.phone_number}</span>
//               </div>
//             )}
            
//             {profileData.profile?.birth_date && (
//               <div className="detail-item">
//                 <span className="detail-label">تاريخ الميلاد:</span>
//                 <span className="detail-value">
//                   {new Date(profileData.profile.birth_date).toLocaleDateString('ar-EG')}
//                 </span>
//               </div>
//             )}
            
//             {profileData.profile?.grade_level && (
//               <div className="detail-item">
//                 <span className="detail-label">المستوى الدراسي:</span>
//                 <span className="detail-value">{profileData.profile.grade_level}</span>
//               </div>
//             )}
            
//             {profileData.profile?.school_name && (
//               <div className="detail-item">
//                 <span className="detail-label">اسم المدرسة:</span>
//                 <span className="detail-value">{profileData.profile.school_name}</span>
//               </div>
//             )}
            
//             {profileData.profile?.favorite_programming_language && (
//               <div className="detail-item">
//                 <span className="detail-label">لغة البرمجة المفضلة:</span>
//                 <span className="detail-value">{profileData.profile.favorite_programming_language}</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="detail-section">
//           <h2>معلومات الحساب</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">تاريخ الانضمام:</span>
//               <span className="detail-value">
//                 {new Date(profileData.created_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">آخر تحديث:</span>
//               <span className="detail-value">
//                 {new Date(profileData.updated_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="profile-actions">
//         <button className="btn-primary">تعديل البروفايل</button>
//         <button className="btn-secondary">تغيير كلمة المرور</button>
//       </div>
//     </div>
//   );
// };

// export { Profile };
// export default Profile;

// import React, { useState, useEffect } from 'react';
// import './Profile.css';

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile data from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch('/api/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add authorization header if needed
//             // 'Authorization': `Bearer ${token}`
//           },
//         });

//         // Debug: Check response status
//         console.log('Response status:', response.status);
//         console.log('Response URL:', response.url);
        
//         // Get response as text first to see what we're getting
//         const responseText = await response.text();
//         console.log('Raw response (first 200 chars):', responseText.substring(0, 200));

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         // Try to parse as JSON
//         let data;
//         try {
//           data = JSON.parse(responseText);
//         } catch (jsonError) {
//           console.error('JSON Parse Error:', jsonError);
//           console.log('Full response text:', responseText);
//           throw new Error('Server returned invalid JSON. Check console for details.');
//         }

//         setProfileData(data.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-spinner"></div>
//         <p>جاري تحميل البروفايل...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="profile-error">
//         <h2>عذراً، حدث خطأ!</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>
//           إعادة المحاولة
//         </button>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="profile-error">
//         <h2>لم يتم العثور على البيانات</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           {profileData.profile?.profile_picture ? (
//             <img 
//               src={profileData.profile.profile_picture} 
//               alt="صورة شخصية"
//               className="avatar-image"
//             />
//           ) : (
//             <div className="avatar-placeholder">
//               <span className="avatar-initial">
//                 {profileData.first_name ? profileData.first_name[0].toUpperCase() : 'U'}
//               </span>
//             </div>
//           )}
//         </div>
        
//         <div className="profile-info">
//           <h1 className="profile-name">
//             {profileData.first_name} {profileData.last_name}
//           </h1>
//           <p className="profile-username">@{profileData.username}</p>
//           <p className="profile-role">{profileData.role === 'kid' ? 'طفل مبرمج' : profileData.role}</p>
//         </div>
//       </div>

//       <div className="profile-stats">
//         <div className="stat-card">
//           <h3>الكورسات المكتملة</h3>
//           <span className="stat-number">{profileData.courses_completed || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>ساعات الدراسة</h3>
//           <span className="stat-number">{profileData.total_study_hours || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>مستوى الخبرة</h3>
//           <span className="stat-level">{profileData.programming_experience || 'مبتدئ'}</span>
//         </div>
//       </div>

//       <div className="profile-details">
//         <div className="detail-section">
//           <h2>معلومات شخصية</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأول:</span>
//               <span className="detail-value">{profileData.first_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأخير:</span>
//               <span className="detail-value">{profileData.last_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">البريد الإلكتروني:</span>
//               <span className="detail-value">{profileData.email}</span>
//             </div>
            
//             {profileData.phone_number && (
//               <div className="detail-item">
//                 <span className="detail-label">رقم الهاتف:</span>
//                 <span className="detail-value">{profileData.phone_number}</span>
//               </div>
//             )}
            
//             {profileData.profile?.birth_date && (
//               <div className="detail-item">
//                 <span className="detail-label">تاريخ الميلاد:</span>
//                 <span className="detail-value">
//                   {new Date(profileData.profile.birth_date).toLocaleDateString('ar-EG')}
//                 </span>
//               </div>
//             )}
            
//             {profileData.profile?.grade_level && (
//               <div className="detail-item">
//                 <span className="detail-label">المستوى الدراسي:</span>
//                 <span className="detail-value">{profileData.profile.grade_level}</span>
//               </div>
//             )}
            
//             {profileData.profile?.school_name && (
//               <div className="detail-item">
//                 <span className="detail-label">اسم المدرسة:</span>
//                 <span className="detail-value">{profileData.profile.school_name}</span>
//               </div>
//             )}
            
//             {profileData.profile?.favorite_programming_language && (
//               <div className="detail-item">
//                 <span className="detail-label">لغة البرمجة المفضلة:</span>
//                 <span className="detail-value">{profileData.profile.favorite_programming_language}</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="detail-section">
//           <h2>معلومات الحساب</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">تاريخ الانضمام:</span>
//               <span className="detail-value">
//                 {new Date(profileData.created_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">آخر تحديث:</span>
//               <span className="detail-value">
//                 {new Date(profileData.updated_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="profile-actions">
//         <button className="btn-primary">تعديل البروفايل</button>
//         <button className="btn-secondary">تغيير كلمة المرور</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import './Profile.css';

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile data from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch('http://127.0.0.1:8000/api/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add authorization header if needed
//             // 'Authorization': `Bearer ${token}`
//           },
//         });

//         // Debug: Check response status
//         console.log('Response status:', response.status);
//         console.log('Response URL:', response.url);
        
//         // Get response as text first to see what we're getting
//         const responseText = await response.text();
//         console.log('Raw response (first 200 chars):', responseText.substring(0, 200));

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         // Try to parse as JSON
//         let data;
//         try {
//           data = JSON.parse(responseText);
//         } catch (jsonError) {
//           console.error('JSON Parse Error:', jsonError);
//           console.log('Full response text:', responseText);
//           throw new Error('Server returned invalid JSON. Check console for details.');
//         }

//         setProfileData(data.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-spinner"></div>
//         <p>جاري تحميل البروفايل...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="profile-error">
//         <h2>عذراً، حدث خطأ!</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>
//           إعادة المحاولة
//         </button>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="profile-error">
//         <h2>لم يتم العثور على البيانات</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           {profileData.profile?.profile_picture ? (
//             <img 
//               src={profileData.profile.profile_picture} 
//               alt="صورة شخصية"
//               className="avatar-image"
//             />
//           ) : (
//             <div className="avatar-placeholder">
//               <span className="avatar-initial">
//                 {profileData.first_name ? profileData.first_name[0].toUpperCase() : 'U'}
//               </span>
//             </div>
//           )}
//         </div>
        
//         <div className="profile-info">
//           <h1 className="profile-name">
//             {profileData.first_name} {profileData.last_name}
//           </h1>
//           <p className="profile-username">@{profileData.username}</p>
//           <p className="profile-role">{profileData.role === 'kid' ? 'طفل مبرمج' : profileData.role}</p>
//         </div>
//       </div>

//       <div className="profile-stats">
//         <div className="stat-card">
//           <h3>الكورسات المكتملة</h3>
//           <span className="stat-number">{profileData.courses_completed || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>ساعات الدراسة</h3>
//           <span className="stat-number">{profileData.total_study_hours || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>مستوى الخبرة</h3>
//           <span className="stat-level">{profileData.programming_experience || 'مبتدئ'}</span>
//         </div>
//       </div>

//       <div className="profile-details">
//         <div className="detail-section">
//           <h2>معلومات شخصية</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأول:</span>
//               <span className="detail-value">{profileData.first_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأخير:</span>
//               <span className="detail-value">{profileData.last_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">البريد الإلكتروني:</span>
//               <span className="detail-value">{profileData.email}</span>
//             </div>
            
//             {profileData.phone_number && (
//               <div className="detail-item">
//                 <span className="detail-label">رقم الهاتف:</span>
//                 <span className="detail-value">{profileData.phone_number}</span>
//               </div>
//             )}
            
//             {profileData.profile?.birth_date && (
//               <div className="detail-item">
//                 <span className="detail-label">تاريخ الميلاد:</span>
//                 <span className="detail-value">
//                   {new Date(profileData.profile.birth_date).toLocaleDateString('ar-EG')}
//                 </span>
//               </div>
//             )}
            
//             {profileData.profile?.grade_level && (
//               <div className="detail-item">
//                 <span className="detail-label">المستوى الدراسي:</span>
//                 <span className="detail-value">{profileData.profile.grade_level}</span>
//               </div>
//             )}
            
//             {profileData.profile?.school_name && (
//               <div className="detail-item">
//                 <span className="detail-label">اسم المدرسة:</span>
//                 <span className="detail-value">{profileData.profile.school_name}</span>
//               </div>
//             )}
            
//             {profileData.profile?.favorite_programming_language && (
//               <div className="detail-item">
//                 <span className="detail-label">لغة البرمجة المفضلة:</span>
//                 <span className="detail-value">{profileData.profile.favorite_programming_language}</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="detail-section">
//           <h2>معلومات الحساب</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">تاريخ الانضمام:</span>
//               <span className="detail-value">
//                 {new Date(profileData.created_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">آخر تحديث:</span>
//               <span className="detail-value">
//                 {new Date(profileData.updated_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="profile-actions">
//         <button className="btn-primary">تعديل البروفايل</button>
//         <button className="btn-secondary">تغيير كلمة المرور</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import './Profile.css';

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile data from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const token = localStorage.getItem('token') || localStorage.getItem('access_token');
//         const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             ...(token && { 'Authorization': `Bearer ${token}` }),
//           },
//         });

//         // Debug: Check response status
//         console.log('Response status:', response.status);
//         console.log('Response URL:', response.url);
        
//         // Get response as text first to see what we're getting
//         const responseText = await response.text();
//         console.log('Raw response (first 200 chars):', responseText.substring(0, 200));

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         // Try to parse as JSON
//         let data;
//         try {
//           data = JSON.parse(responseText);
//         } catch (jsonError) {
//           console.error('JSON Parse Error:', jsonError);
//           console.log('Full response text:', responseText);
//           throw new Error('Server returned invalid JSON. Check console for details.');
//         }

//         setProfileData(data.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-spinner"></div>
//         <p>جاري تحميل البروفايل...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="profile-error">
//         <h2>عذراً، حدث خطأ!</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>
//           إعادة المحاولة
//         </button>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="profile-error">
//         <h2>لم يتم العثور على البيانات</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           {profileData.profile?.profile_picture ? (
//             <img 
//               src={profileData.profile.profile_picture} 
//               alt="صورة شخصية"
//               className="avatar-image"
//             />
//           ) : (
//             <div className="avatar-placeholder">
//               <span className="avatar-initial">
//                 {profileData.first_name ? profileData.first_name[0].toUpperCase() : 'U'}
//               </span>
//             </div>
//           )}
//         </div>
        
//         <div className="profile-info">
//           <h1 className="profile-name">
//             {profileData.first_name} {profileData.last_name}
//           </h1>
//           <p className="profile-username">@{profileData.username}</p>
//           <p className="profile-role">{profileData.role === 'kid' ? 'طفل مبرمج' : profileData.role}</p>
//         </div>
//       </div>

//       <div className="profile-stats">
//         <div className="stat-card">
//           <h3>الكورسات المكتملة</h3>
//           <span className="stat-number">{profileData.courses_completed || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>ساعات الدراسة</h3>
//           <span className="stat-number">{profileData.total_study_hours || 0}</span>
//         </div>
        
//         <div className="stat-card">
//           <h3>مستوى الخبرة</h3>
//           <span className="stat-level">{profileData.programming_experience || 'مبتدئ'}</span>
//         </div>
//       </div>

//       <div className="profile-details">
//         <div className="detail-section">
//           <h2>معلومات شخصية</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأول:</span>
//               <span className="detail-value">{profileData.first_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">الاسم الأخير:</span>
//               <span className="detail-value">{profileData.last_name || 'غير محدد'}</span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">البريد الإلكتروني:</span>
//               <span className="detail-value">{profileData.email}</span>
//             </div>
            
//             {profileData.phone_number && (
//               <div className="detail-item">
//                 <span className="detail-label">رقم الهاتف:</span>
//                 <span className="detail-value">{profileData.phone_number}</span>
//               </div>
//             )}
            
//             {profileData.profile?.birth_date && (
//               <div className="detail-item">
//                 <span className="detail-label">تاريخ الميلاد:</span>
//                 <span className="detail-value">
//                   {new Date(profileData.profile.birth_date).toLocaleDateString('ar-EG')}
//                 </span>
//               </div>
//             )}
            
//             {profileData.profile?.grade_level && (
//               <div className="detail-item">
//                 <span className="detail-label">المستوى الدراسي:</span>
//                 <span className="detail-value">{profileData.profile.grade_level}</span>
//               </div>
//             )}
            
//             {profileData.profile?.school_name && (
//               <div className="detail-item">
//                 <span className="detail-label">اسم المدرسة:</span>
//                 <span className="detail-value">{profileData.profile.school_name}</span>
//               </div>
//             )}
            
//             {profileData.profile?.favorite_programming_language && (
//               <div className="detail-item">
//                 <span className="detail-label">لغة البرمجة المفضلة:</span>
//                 <span className="detail-value">{profileData.profile.favorite_programming_language}</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="detail-section">
//           <h2>معلومات الحساب</h2>
//           <div className="detail-grid">
//             <div className="detail-item">
//               <span className="detail-label">تاريخ الانضمام:</span>
//               <span className="detail-value">
//                 {new Date(profileData.created_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
            
//             <div className="detail-item">
//               <span className="detail-label">آخر تحديث:</span>
//               <span className="detail-value">
//                 {new Date(profileData.updated_at).toLocaleDateString('ar-EG')}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="profile-actions">
//         <button className="btn-primary">تعديل البروفايل</button>
//         <button className="btn-secondary">تغيير كلمة المرور</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Get authentication token
        const token = localStorage.getItem('token') || localStorage.getItem('access_token') || localStorage.getItem('authToken');
        
        const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('يجب تسجيل الدخول أولاً');
          }
          throw new Error(`خطأ في الخادم: ${response.status}`);
        }

        const data = await response.json();
        console.log('Profile data received:', data);
        
        // The API returns data in "data" property based on your JSON structure
        setProfileData(data.data || data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>جاري تحميل البروفايل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h2>عذراً، حدث خطأ!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-error">
        <h2>لم يتم العثور على البيانات</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profileData.profile?.profile_picture ? (
            <img 
              src={profileData.profile.profile_picture} 
              alt="صورة شخصية"
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder">
              <span className="avatar-initial">
                {profileData.first_name ? profileData.first_name[0].toUpperCase() : 'U'}
              </span>
            </div>
          )}
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name">
            {profileData.first_name} {profileData.last_name}
          </h1>
          <p className="profile-username">@{profileData.username}</p>
          <p className="profile-role">{profileData.role === 'kid' ? 'طفل مبرمج' : profileData.role}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>الكورسات المكتملة</h3>
          <span className="stat-number">{profileData.courses_completed || 0}</span>
        </div>
        
        <div className="stat-card">
          <h3>ساعات الدراسة</h3>
          <span className="stat-number">{profileData.total_study_hours || 0}</span>
        </div>
        
        <div className="stat-card">
          <h3>مستوى الخبرة</h3>
          <span className="stat-level">{profileData.programming_experience || 'مبتدئ'}</span>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-section">
          <h2>معلومات شخصية</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">الاسم الأول:</span>
              <span className="detail-value">{profileData.first_name || 'غير محدد'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">الاسم الأخير:</span>
              <span className="detail-value">{profileData.last_name || 'غير محدد'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">البريد الإلكتروني:</span>
              <span className="detail-value">{profileData.email}</span>
            </div>
            
            {profileData.phone_number && (
              <div className="detail-item">
                <span className="detail-label">رقم الهاتف:</span>
                <span className="detail-value">{profileData.phone_number}</span>
              </div>
            )}
            
            {profileData.profile?.birth_date && (
              <div className="detail-item">
                <span className="detail-label">تاريخ الميلاد:</span>
                <span className="detail-value">
                  {new Date(profileData.profile.birth_date).toLocaleDateString('ar-EG')}
                </span>
              </div>
            )}
            
            {profileData.profile?.grade_level && (
              <div className="detail-item">
                <span className="detail-label">المستوى الدراسي:</span>
                <span className="detail-value">{profileData.profile.grade_level}</span>
              </div>
            )}
            
            {profileData.profile?.school_name && (
              <div className="detail-item">
                <span className="detail-label">اسم المدرسة:</span>
                <span className="detail-value">{profileData.profile.school_name}</span>
              </div>
            )}
            
            {profileData.profile?.favorite_programming_language && (
              <div className="detail-item">
                <span className="detail-label">لغة البرمجة المفضلة:</span>
                <span className="detail-value">{profileData.profile.favorite_programming_language}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="detail-section">
          <h2>معلومات الحساب</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">تاريخ الانضمام:</span>
              <span className="detail-value">
                {new Date(profileData.created_at).toLocaleDateString('ar-EG')}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">آخر تحديث:</span>
              <span className="detail-value">
                {new Date(profileData.updated_at).toLocaleDateString('ar-EG')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn-primary">تعديل البروفايل</button>
        <button className="btn-secondary">تغيير كلمة المرور</button>
      </div>
    </div>
  );
};

export default Profile;