import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || (process.env.VERCEL ? '*' : 'http://localhost:3000'),
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  security: {
    helmetCspEnabled: process.env.HELMET_CSP_ENABLED === 'true',
  },
  logging: {
    morganFormat: process.env.MORGAN_FORMAT || (process.env.VERCEL ? 'tiny' : 'combined'),
  },
} as const;

export type Config = typeof config;
