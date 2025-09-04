import express from 'express'
import { createShastar, deleteShastar, getShastar, getSingleShastar, updateShastar } from '../controllers/shastarInfo.controller.js'

const router = express.Router()

router.get('/',getShastar)
router.get('/:sId',getSingleShastar)
router.post('/create',createShastar)
router.put('/update/:sId',updateShastar)
router.delete('/delete/:sId',deleteShastar)

export default router