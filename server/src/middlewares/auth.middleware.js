import { verifyToken } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login.',
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove "Bearer " prefix

        // Verify token
        const decoded = verifyToken(token);

        // Attach user info to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please login again.',
        });
    }
};

export default authMiddleware;