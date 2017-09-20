import * as modelsProxy from '../proxy/'

const userProxy  = modelsProxy.userProxy;
import crypto from 'crypto'

const secretKey = 'fd*^$#ygwefugb!#TYTf%&lasgdfiu&*%^'; 

const reg = function(req,res,next){
	userProxy.getUserByName(req.body.username,(err,user)=>{
		if(err){
			return next(err)
		}
		if(user){
			return res.json({key:0,err:'用户已存在'})
		}
		let date = (new Date()).toLocaleString()
		let newUser = {
			username:req.body.username,
			password:req.body.password,
			regTime:date,
			lastLogin:date
		}
		let hmac = crypto.createHmac('sha256', secretKey)
		newUser.password = hmac.update(newUser.password).digest('hex')
		userProxy.createUser(newUser,(err,newuser)=>{
			if(err){
				return next(err);
			}
			return res.json({key:1,user:newuser})
		})
	})
}

const login = function(req,res,next){
	userProxy.getUserByName(req.body.username,(err,user)=>{
		if(err){
			return next(err);
		}
		if(!user){
			return res.json({key:0,err:'用户不存在'})
		}
		let hmac = crypto.createHmac('sha256', secretKey)
		let password = hmac.update(req.body.password).digest('hex')
		if(password !== user.password){
			return res.json({key:0,err:'密码错误'})
		}
		let date = (new Date()).toLocaleString()
		req.session.userInfo = {
			username:user.username,
			regTime:user.regTime,
			lastLogin:user.lastLogin
		}
		userProxy.updateUserLastLogin(req.body.username,(err,newuser)=>{
			if(err){
				return next(err)
			}
			return res.json({key:1,user:newuser})
		})
	})
}

const getUserInfoFromSession = function(req,res,next){
	res.json({key:1,userInfo:req.session.userInfo})
}

const delUserInfoFromSession = function(req,res,next){
	req.session.userInfo = null
	res.json({key:1})
}

export {reg,login,getUserInfoFromSession,delUserInfoFromSession}