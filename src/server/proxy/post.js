import * as Models from '../models/' 
const postModel = Models.postModel

//创建文章
export const createPost = function(obj,callback){
	let post = new postModel()
	post.title = obj.title
	post.post = obj.post
	post.time = obj.time
	post.author = obj.author
	post.pv = obj.pv
	post.code = obj.code
	post.save(callback)
}

export const find = function(code,callback){
	if(code){
		postModel.find({code:code},callback)
	}else{
		postModel.find({},callback)
	}
	
}