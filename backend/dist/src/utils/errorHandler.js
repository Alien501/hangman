"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
const errorHandler = (error, req, res) => {
    const { statusCode = 500, message } = error;
    res.status(statusCode).json({
        error: {
            message,
            status: statusCode,
            timestamp: new Date().toISOString(),
            path: req.path,
        },
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404,
            timestamp: new Date().toISOString(),
            path: req.path,
        },
    });
};
exports.notFoundHandler = notFoundHandler;
