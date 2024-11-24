import { Router } from 'express';
import {authUser} from '../../controllers/authController.js';

const router = Router();
router.post('/login', authUser);

export default router;