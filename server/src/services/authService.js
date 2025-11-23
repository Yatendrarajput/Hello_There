import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken, generateRefreshToken } from '../utils/jwt.js';

class AuthService {
    // Register new user
    async register(userData) {
        const { name, email, password } = userData;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const token = generateToken({ userId: user.id, email: user.email });
        const refreshToken = generateRefreshToken({ userId: user.id });

        return {
            user,
            token,
            refreshToken,
        };
    }

    // Login user
    async login(credentials) {
        const { email, password } = credentials;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate tokens
        const token = generateToken({ userId: user.id, email: user.email });
        const refreshToken = generateRefreshToken({ userId: user.id });

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
            refreshToken,
        };
    }

    // Get user by ID
    async getUserById(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                profilePicture: true,
                city: true,
                averageRating: true,
                totalReviews: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // Update user profile
    async updateProfile(userId, updateData) {
        const { name, bio, city, dateOfBirth, phone } = updateData;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name && { name }),
                ...(bio && { bio }),
                ...(city && { city }),
                ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
                ...(phone && { phone }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                profilePicture: true,
                city: true,
                dateOfBirth: true,
                phone: true,
                averageRating: true,
                totalReviews: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updatedUser;
    }
}


export default new AuthService();