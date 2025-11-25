// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  ME: '/auth/me',
  UPDATE_PROFILE: '/auth/me',
};

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'eventmeet_token',
  REFRESH_TOKEN: 'eventmeet_refresh_token',
  USER: 'eventmeet_user',
};

// Routes
export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/home',
  PROFILE_SETUP: '/profile-setup',
  INDEX: '/index',
};