import express from 'express';
import { addMedicine } from '../controllers/medicineController.js';

const router = express.Router();

// Route to add a new medicine
router.post('/add', addMedicine);

export default router;
