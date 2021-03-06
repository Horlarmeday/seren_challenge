import { Router } from 'express';
import QuestionController from './question.controller';
import verify from '../../middleware/verify';

const router = Router();
router.post('/', QuestionController.createQuestion);
router.get('/', QuestionController.getQuestions);
router.get('/position', QuestionController.getQuestionByPosition);

export default router;
