import { Router } from 'express';
import { getUserById, authUser} from '../../controllers/authController.js';
import 'dotenv/config';
 
const router = Router();
router.post('/login', authUser);
router.get('/:id', getUserById);

export default router;