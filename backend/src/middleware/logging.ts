import morgan from 'morgan';
import { config } from '../config/environment';

export const loggingMiddleware = morgan(config.logging.morganFormat, {
  skip: req => {
    // Skip logging for health checks in production
    return config.nodeEnv === 'production' && req.url === '/health';
  },
});
