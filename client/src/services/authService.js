import api from './api';
import { AUTH_ENDPOINTS } from '../config/constants';
import { storage } from '../utils/storage';

export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
      
      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data;
        
        // Store auth data
        storage.setToken(token);
        storage.setRefreshToken(refreshToken);
        storage.setUser(user);
        
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      
      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data;
        
        // Store auth data
        storage.setToken(token);
        storage.setRefreshToken(refreshToken);
        storage.setUser(user);
        
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get(AUTH_ENDPOINTS.ME);
      
      if (response.data.success) {
        storage.setUser(response.data.data);
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch user';
      return { success: false, message };
    }
  },

  // Update profile
  async updateProfile(profileData) {
    try {
      const response = await api.put(AUTH_ENDPOINTS.UPDATE_PROFILE, profileData);
      
      if (response.data.success) {
        storage.setUser(response.data.data);
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return { success: false, message };
    }
  },

  // Logout
  logout() {
    storage.clearAuth();
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = storage.getToken();
    const user = storage.getUser();
    return !!(token && user);
  },

  // Get stored user
  getStoredUser() {
    return storage.getUser();
  },
};