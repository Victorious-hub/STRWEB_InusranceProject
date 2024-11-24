import { Router } from 'express';
import { createAgent } from '../../controllers/agentController.js';

const router = Router();
router.post('/', createAgent);

export default router;