import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// Protected routes
router.get('/me', authMiddleware, authController.getMe.bind(authController));
router.put('/me', authMiddleware, authController.updateProfile.bind(authController)); // ← NEW

export default router;