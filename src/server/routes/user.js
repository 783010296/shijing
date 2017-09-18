import express from 'express'
const router = express.Router()

import * as userCtrl from '../controllers/user'

router.post('/reg',userCtrl.reg)
router.post('/login',userCtrl.login)

router.get('/test',(req,res,next)=>{
	console.log(req)
	res.json({adfsd:1})
	/*if(req.session.count){
		req.session.count++;
		return res.json({count:req.session.count})
	}else{
		req.session.count = 1;
		return res.json({count:req.session.count})
	}*/
})

export default router