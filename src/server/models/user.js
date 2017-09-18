//用户模型
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	username:String,//用户名
	password:String,//密码
	regTime:String,//注册时间
	lastLogin:String//上一次登录时间
})

mongoose.model('Users',userSchema)//建表Users

