const express = require('express')
const router = express.Router()

import User from '../models/user'

const secretKey = 'fd*^$#ygwefugb!#TYTf%&lasgdfiu&*%^'; 

router.post('/reg',(req,res)=>{
	User.find({username:req.body.username},(err,user)=>{
		if(err){
			return res.josn({key:'0',err:err})
		}
		if(user){
			return res.json({key:'0',err:'用户已存在'})
		}
		let date = new Date()
		let time = {
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear() + "-" + (date.getMonth()+1),
			day:date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
			minute:date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() +" "+
					date.getHours() + ":" + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
		};
		let newUser = {
			username:req.body.username,
			password:req.body.password,
			regTime:time,
			lastLogin:time
		}
		let hmac = crypto.createHmac('sha256', secretKey)
		newUser.password = hmac.updata(newUser.password).digest('hex')
		User.create(req.body,(err,user)=>{
			if(err){
				return res.json({key:'0',err:err})
			}
			return res.json({key:'1',user:user})
		})
	})
})

router.post('/login',(req,res)=>{
	/*User.findOne({},(err,user)=>{
		if(err){
			return res.json({key:'0',err:err})
		}
		if(!user){
			return res.json({key:'0',err:'用户不存在'})
		}
		let hmac = crypto.createHmac('sha256', secretKey)
		let password = hmac.updata(newUser.password).digest('hex')
		if(password != req.body.password){
			return res.json({key:'0',err:'密码错误'})
		}
		res.json({key:'1',user:user})
		return res.redirect('/')
	})*/
	User.findOne({username:req.body.username}).then(user=>{
		console.log('12')
		console.log(user);
	}).catch(err=>{
		console.log('122')
		console.log(err)
	})
})

router.get('/get',(req,res)=>{
	res.json({'lalal':'hahah'})
})



export default router