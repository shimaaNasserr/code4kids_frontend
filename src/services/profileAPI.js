
// services/profileAPI.js
const BASE_URL = 'http://localhost:8000/api/accounts';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

const getAuthHeadersForFile = () => {
  const token = localStorage.getItem('userToken');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

const isAuthenticated = () => {
  const token = localStorage.getItem('userToken');
  return !!token;
};

const handleApiError = (error) => {
  if (error.status === 401) {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }
  
  if (error.status === 403) {
    throw new Error('You do not have permission to access this data.');
  }
  
  if (error.status >= 500) {
    throw new Error('Server error. Please try again later.');
  }
  
  throw error;
};

class ProfileAPI {
  
  static async getProfile() {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const response = await fetch(`${BASE_URL}/profile/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  static async getProfileDashboard() {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const response = await fetch(`${BASE_URL}/profile/dashboard/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching profile dashboard:', error);
      throw error;
    }
  }

  static async updateProfile(profileData) {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const response = await fetch(`${BASE_URL}/profile/update/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  static async uploadAvatar(avatarFile) {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await fetch(`${BASE_URL}/profile/avatar/`, {
        method: 'POST',
        headers: getAuthHeadersForFile(),
        body: formData,
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }

  static async getAchievements() {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const response = await fetch(`${BASE_URL}/profile/achievements/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw error;
    }
  }

  static async getCourseProgress(courseId) {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const response = await fetch(`${BASE_URL}/profile/course/${courseId}/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  }

  static async addPoints(points) {
    if (!isAuthenticated()) {
      throw new Error('You must be logged in first.');
    }

    try {
      const response = await fetch(`${BASE_URL}/profile/add-points/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ points }),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  }
}

export default ProfileAPI;
