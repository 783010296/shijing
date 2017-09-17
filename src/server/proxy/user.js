import * as Models from '../models/'
const userModel = Models.userModel

const getUserByName = function(name,callback){
	userModel.findOne({username:name},callback)
}


export { getUserByName }