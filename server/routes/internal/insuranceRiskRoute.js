import { Router } from 'express';
import {createInsuranceRisk, getInsuranceRisks} from '../../controllers/inusranceRiskController.js';

const router = Router();
router.post('/', createInsuranceRisk);
router.get('/', getInsuranceRisks);

export default router;