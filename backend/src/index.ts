import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';

import { config } from './config/environment';
import { securityMiddleware } from './middleware/security';
import { corsOptions } from './middleware/cors';
import { loggingMiddleware } from './middleware/logging';
import apiRouter from './routes/api';
import { errorHandler, notFoundHandler } from './utils/errorHandler';

const app = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsOptions));
app.use(loggingMiddleware);
app.use(securityMiddleware);

// Routes
app.use('/api', apiRouter);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hangman API Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const server = app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`📊 Environment: ${config.nodeEnv}`);
    console.log(`🌐 CORS Origin: ${config.cors.origin}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
  });

  // Graceful shutdown
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
}

export default app;
