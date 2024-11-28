import { Router } from 'express';
import { createAgent, getAgentByUserId, getContractsByAgentAffiliate, getAgents } from '../../controllers/agentController.js';

const router = Router();
router.post('/', createAgent);
router.get('/:id', getAgentByUserId);
router.get('/', getAgents);
router.get('/contracts/:id', getContractsByAgentAffiliate);

export default router;