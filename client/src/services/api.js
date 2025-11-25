import axios from 'axios';
import { API_URL } from '../config/constants';
import { storage } from '../utils/storage';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401) {
      storage.clearAuth();
      window.location.href = '/login';
    }

    // Return error for handling in components
    return Promise.reject(error);
  }
);

export default api;