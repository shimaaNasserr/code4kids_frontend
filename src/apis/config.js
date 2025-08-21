import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');

        const res = await axios.post(
          'http://127.0.0.1:8000/api/token/refresh/',
          { refresh: refreshToken }, 
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem('access_token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        window.location.replace = '/accounts/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
