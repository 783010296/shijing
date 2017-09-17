import * as Models from '../models/'
const newsModel = Models.newsModel

const getNewByName = function(name,callback){
	userModel.findOne({username:name},callback)
}


export {getUserByName}