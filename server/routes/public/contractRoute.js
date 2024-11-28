import { Router } from 'express';
import { applyContract, getContractById, deleteContract, signContract, createContract, getContracts, getContractsByUserId } from '../../controllers/contractController.js';
import 'dotenv/config';

const router = Router();
router.post('/', createContract);
router.get('/', getContracts);
router.get('/user/:id', getContractsByUserId);
router.get('/:id', getContractById);
router.put('/:id', signContract);
router.delete('/:id', deleteContract);
router.put('/confirm/:id', applyContract);

export default router;