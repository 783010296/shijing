import express from 'express'
const router = express.Router()

import * as userCtrl from '../controllers/user'

router.post('/reg',userCtrl.reg)
router.post('/login',userCtrl.login)
router.get('/getUserInfo',userCtrl.getUserInfoFromSession)
router.get('/delUserInfo',userCtrl.delUserInfoFromSession)

router.get('/test',(req,res,next)=>{
	return res.status('400').json({qwe:'qwe'})
})

export default router