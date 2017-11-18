import * as Models from '../models/'
const userModel = Models.userModel

const getUserByName = function(name,callback){
	userModel.findOne({username:name},callback)
}

const createUser = function(obj,callback){ //还有另外一种保存方式，userModel.create
	var user = new userModel()
	user.username = obj.username
	user.password = obj.password
	user.regTime = obj.regTime
	user.lastLogin = obj.lastLogin
	user.save(callback)
}

const updateUserLastLogin = function(username,callback){
	let date = (new Date()).toLocaleString()
	userModel.update({username:username},{$set:{lastLogin:date}},{new:true},callback)
}

export { getUserByName, createUser,updateUserLastLogin}