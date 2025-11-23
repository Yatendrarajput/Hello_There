import { ZodError } from 'zod';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: err.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        });
    }

    // Custom error messages
    if (err.message) {
        const statusCode = err.statusCode || 400;
        return res.status(statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Default error
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};

export default errorHandler;