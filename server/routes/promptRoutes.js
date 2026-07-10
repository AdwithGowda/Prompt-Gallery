import express from 'express';
import { getPrompts, createPrompt, getPromptById, updatePrompt, deletePrompt } from '../controllers/promptController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getPrompts).post(protect, createPrompt);
router.route('/:id').get(protect, getPromptById).put(protect, updatePrompt).delete(protect, deletePrompt);

export default router;
