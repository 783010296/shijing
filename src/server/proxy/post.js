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

export const findOne = function(code,callback){
	postModel.findOne({code:code},function(err,post){
		if(err){
			return callback(err)
		}
		post.pv = post.pv - 0 + 1
		post.save(callback)
	})
}

export const findAll = function(callback){
	postModel.find({},callback)
}
