import { Router } from 'express';
import {createInsuranceObject, getInsuranceObjects} from '../../controllers/insuranceController.js';

const router = Router();
router.post('/', createInsuranceObject);
router.get('/', getInsuranceObjects);

export default router;