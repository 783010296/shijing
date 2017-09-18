import express from 'express'
const router = express.Router()

import * as userCtrl from '../controllers/user'

router.post('/reg',userCtrl.reg)
router.post('/login',userCtrl.login)

export default router