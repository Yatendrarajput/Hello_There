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
            include: {
                interests: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Format response - remove password and format interests
        const { password, emailVerified, phoneVerified, dateOfBirth, phone, updatedAt, ...userWithoutSensitiveData } = user;

        const formattedUser = {
            ...userWithoutSensitiveData,
            interests: user.interests.map((i) => i.interest),
        };

        return formattedUser;
    }

    // Update user profile
    async updateProfile(userId, updateData) {
        const { name, bio, city, dateOfBirth, phone, interests } = updateData;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { interests: true },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Start transaction to update user and interests
        const updatedUser = await prisma.$transaction(async (tx) => {
            // Update user basic info
            const updated = await tx.user.update({
                where: { id: userId },
                data: {
                    ...(name && { name }),
                    ...(bio !== undefined && { bio }),
                    ...(city && { city }),
                    ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
                    ...(phone && { phone }),
                },
            });

            // Update interests if provided
            if (interests && Array.isArray(interests)) {
                // Delete existing interests
                await tx.userInterest.deleteMany({
                    where: { userId },
                });

                // Add new interests
                if (interests.length > 0) {
                    await tx.userInterest.createMany({
                        data: interests.map((interest) => ({
                            userId,
                            interest,
                        })),
                    });
                }
            }

            // Fetch updated user with interests
            return await tx.user.findUnique({
                where: { id: userId },
                include: {
                    interests: true,
                },
            });
        });

        // Format interests for response and remove sensitive data
        const { password, emailVerified, phoneVerified, ...userWithoutPassword } = updatedUser;

        const formattedUser = {
            ...userWithoutPassword,
            interests: updatedUser.interests.map((i) => i.interest),
        };

        return formattedUser;
    }
}


export default new AuthService();