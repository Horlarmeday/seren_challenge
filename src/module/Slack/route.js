import { Router } from 'express';
import slashCommand from './slashCommand';

const router = Router();
router.post('/commands', slashCommand);

export default router;
