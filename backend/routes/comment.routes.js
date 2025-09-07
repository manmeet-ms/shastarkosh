import express from 'express'
import { getCommentsOnSinglePost, postComment } from '../controllers/comments.controller.js'
import { authenticateJWT } from '../middlewares/auth.middleware.js'
 
const router = express.Router()
 router.post('/:postId', authenticateJWT, postComment)
 router.get('/count/:postId', getCommentsOnSinglePost)
export default router     