import { Router } from 'express';
import { createAffiliate } from '../../controllers/affiliateController.js';

const router = Router();
router.post('/', createAffiliate);

export default router;