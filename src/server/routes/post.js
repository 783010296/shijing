import express from 'express'
const router = express.Router()

import * as postCtrl from '../controllers/post'

router.post('/add',postCtrl.add)
router.get('/findOne',postCtrl.findOne)
router.get('/findAll',postCtrl.findAll)

export default router