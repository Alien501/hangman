import { Router } from 'express';
import healthRouter from './health';
import wordsRouter from './words';

const router = Router();

// Mount routes
router.use('/health', healthRouter);

// Routes
router.use('/word', wordsRouter);

export default router;
