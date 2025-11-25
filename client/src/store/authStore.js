import { create } from 'zustand';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';

export const useAuthStore = create((set, get) => ({
  // State
  user: storage.getUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    const result = await authService.login(credentials);
    
    if (result.success) {
      set({ 
        user: result.data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return { success: true };
    } else {
      set({ isLoading: false, error: result.message });
      return { success: false, message: result.message };
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    
    const result = await authService.register(userData);
    
    if (result.success) {
      set({ 
        user: result.data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return { success: true };
    } else {
      set({ isLoading: false, error: result.message });
      return { success: false, message: result.message };
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    
    const result = await authService.updateProfile(profileData);
    
    if (result.success) {
      set({ user: result.data, isLoading: false });
      return { success: true };
    } else {
      set({ isLoading: false, error: result.message });
      return { success: false, message: result.message };
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    const token = storage.getToken();
    
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    const result = await authService.getCurrentUser();
    
    if (result.success) {
      set({ user: result.data, isAuthenticated: true });
    } else {
      authService.logout();
      set({ user: null, isAuthenticated: false });
    }
  },
}));