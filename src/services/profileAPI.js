// services/profileAPI.js

const BASE_URL = 'http://localhost:8000/api/accounts';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

const getAuthHeadersForFile = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

class ProfileAPI {
  
  static async getProfile() {
    try {
      const response = await fetch(`${BASE_URL}/profile/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  static async getProfileDashboard() {
    try {
      const response = await fetch(`${BASE_URL}/profile/dashboard/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching profile dashboard:', error);
      throw error;
    }
  }

  static async updateProfile(profileData) {
    try {
      const response = await fetch(`${BASE_URL}/profile/update/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  static async uploadAvatar(avatarFile) {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await fetch(`${BASE_URL}/profile/avatar/`, {
        method: 'POST',
        headers: getAuthHeadersForFile(),
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }

  static async getAchievements() {
    try {
      const response = await fetch(`${BASE_URL}/profile/achievements/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw error;
    }
  }

  static async getCourseProgress(courseId) {
    try {
      const response = await fetch(`${BASE_URL}/profile/course/${courseId}/`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  }

  static async addPoints(points) {
    try {
      const response = await fetch(`${BASE_URL}/profile/add-points/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ points }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  }
}

export default ProfileAPI;