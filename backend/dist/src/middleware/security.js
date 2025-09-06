"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddleware = void 0;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const environment_1 = require("../config/environment");
exports.securityMiddleware = [
    (0, helmet_1.default)({
        contentSecurityPolicy: environment_1.config.security.helmetCspEnabled ? undefined : false,
        crossOriginEmbedderPolicy: false,
    }),
    (0, express_rate_limit_1.default)({
        windowMs: environment_1.config.rateLimit.windowMs,
        max: environment_1.config.rateLimit.maxRequests,
        message: {
            error: 'Too many requests from this IP, please try again later.',
        },
        standardHeaders: true,
        legacyHeaders: false,
    }),
];
