import authService from '../services/authService.js';
import { validateData, registerSchema, loginSchema } from '../utils/validation.js';

class AuthController {
    // Register new user
    async register(req, res, next) {
        try {
            // Validate request body
            const validatedData = validateData(registerSchema, req.body);

            // Register user
            const result = await authService.register(validatedData);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Login user
    async login(req, res, next) {
        try {
            // Validate request body
            const validatedData = validateData(loginSchema, req.body);

            // Login user
            const result = await authService.login(validatedData);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get current user (protected route - we'll add middleware later)
    async getMe(req, res, next) {
        try {
            const userId = req.user.userId; // Will come from auth middleware

            const user = await authService.getUserById(userId);

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update profile
    async updateProfile(req, res, next) {
        try {
            const userId = req.user.userId; // From auth middleware
            const updateData = req.body;

            const user = await authService.updateProfile(userId, updateData);

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();