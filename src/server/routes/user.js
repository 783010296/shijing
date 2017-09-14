import express from 'express'
const router = express.Router()

import User from '../models/user'
import crypto from 'crypto'

const secretKey = 'fd*^$#ygwefugb!#TYTf%&lasgdfiu&*%^'; 

router.post('/reg',(req,res)=>{
	User.find({username:req.body.username},(err,user)=>{
		if(err){
			return res.json({key:'0',err:err})
		}
		if(user.length !== 0){
			return res.json({key:'0',err:'用户已存在'})
		}
		let date = (new Date()).toLocaleString()
		let newUser = {
			username:req.body.username,
			password:req.body.password,
			regTime:date,
			lastLogin:date
		}
		console.log(newUser);
		let hmac = crypto.createHmac('sha256', secretKey)
		newUser.password = hmac.update(newUser.password).digest('hex')
		User.create(newUser,(err,user)=>{
			if(err){
				return res.json({key:'0',err:err})
			}
			return res.json({key:'1',user:user})
		})
	})
})

router.post('/login',(req,res)=>{
	User.findOne({username:req.body.username},(err,user)=>{
		if(err){
			return res.json({key:'0',err:err})
		}
		if(!user){
			return res.json({key:'0',err:'用户不存在'})
		}
		let hmac = crypto.createHmac('sha256', secretKey)
		let password = hmac.update(req.body.password).digest('hex')
		if(password !== user.password){
			return res.json({key:'0',err:'密码错误'})
		}
		let date = (new Date()).toLocaleString()
		User.findOneAndUpdate({username:req.body.username},{$set:{lastLogin:date}},{new:true}).then(user=>{
			res.json({key:'1',user:user})
		}).catch(err=>{
			res.json({key:'0',err:err})
		})
/*		return res.redirect('/')*/
	})
})

router.get('/get',(req,res)=>{
	res.json({'lalal':'hahah'})
})

export default router