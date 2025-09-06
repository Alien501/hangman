"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const environment_1 = require("./config/environment");
const security_1 = require("./middleware/security");
const cors_2 = require("./middleware/cors");
const logging_1 = require("./middleware/logging");
const api_1 = __importDefault(require("./routes/api"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use(logging_1.loggingMiddleware);
app.use(security_1.securityMiddleware);
app.use('/api', api_1.default);
app.get('/', (_req, res) => {
    res.json({
        message: 'Hangman API Server',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
    });
});
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
const server = app.listen(environment_1.config.port, () => {
    console.log(`🚀 Server running on port ${environment_1.config.port}`);
    console.log(`📊 Environment: ${environment_1.config.nodeEnv}`);
    console.log(`🌐 CORS Origin: ${environment_1.config.cors.origin}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
exports.default = app;
