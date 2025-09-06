import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Mount routes
router.use('/health', healthRouter);

// API routes will be added here
// router.use('/games', gamesRouter);
// router.use('/words', wordsRouter);

export default router;
