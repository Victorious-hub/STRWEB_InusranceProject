import { Router } from 'express';
import {createInsuranceRisk, getInsuranceRisks, getInsuranceRisksByObjectId} from '../../controllers/inusranceRiskController.js';

const router = Router();
router.post('/', createInsuranceRisk);
router.get('/', getInsuranceRisks);
router.get('/:id', getInsuranceRisksByObjectId);

export default router;