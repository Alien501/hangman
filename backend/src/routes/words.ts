import { wordList, Word } from '../data/words';
import { Router, Response, Request } from 'express';

const router = Router();

/**
 * This function will return random tamil word from the dataset
 */
router.get('/', (_req: Request, res: Response) => {
  const randomWord: Word =
    wordList[Math.round(Math.random() * wordList.length)];
  res.status(200).send({
    message: 'Data fetched successfully!',
    data: randomWord,
  });
});

export default router;
