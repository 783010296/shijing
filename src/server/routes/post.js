import express from 'express'
const router = express.Router()

import * as postCtrl from '../controllers/post'

router.post('/add',postCtrl.add)

export default router