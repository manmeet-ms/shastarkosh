import express from 'express';
import { aiChat, getContext } from '../controllers/ai.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// AI Chat endpoint - requires authentication
router.post('/chat',  aiChat);

// Get context endpoint (for debugging) - requires authentication
router.get('/context', authenticateJWT, getContext);

export default router;
