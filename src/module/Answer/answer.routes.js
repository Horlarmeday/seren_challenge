import { Router } from 'express';
import AnswerController from './answer.controller';

const router = Router();
router.get('/', AnswerController.getAnswers);
router.get('/user', AnswerController.getAnswersByUser);

export default router;
