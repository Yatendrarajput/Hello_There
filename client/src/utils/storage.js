import { STORAGE_KEYS } from '../config/constants';

export const storage = {
  // Token management
  setToken(token) {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // Refresh token management
  setRefreshToken(refreshToken) {
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  },

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  removeRefreshToken() {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // User data management
  setUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Clear all auth data
  clearAuth() {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
  },
};