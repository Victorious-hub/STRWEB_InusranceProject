import { Router } from 'express';
import { createAffiliate, getAffiliates } from '../../controllers/affiliateController.js';

const router = Router();
router.post('/create', createAffiliate);
router.get('/', getAffiliates);


export default router;
