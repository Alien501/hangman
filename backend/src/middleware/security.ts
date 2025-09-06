import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from '../config/environment';

export const securityMiddleware = [
  // Helmet for security headers
  helmet({
    contentSecurityPolicy: config.security.helmetCspEnabled ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }),

  // Rate limiting
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
      error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),
];
