import express from 'express'
const router = express.Router()

import * as postCtrl from '../controllers/post'

router.post('/add',postCtrl.add)
router.get('/find',postCtrl.find)

export default router