import { Router } from 'express';
import { getPolicies, createPolicy} from '../../controllers/policyController.js';
import 'dotenv/config';

const router = Router();
router.post('/', createPolicy);
router.get('/', getPolicies);

export default router;