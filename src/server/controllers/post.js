import * as modelsProxy from '../proxy/'
const postProxy  = modelsProxy.postProxy

import uuid from 'node-uuid'
import marked from 'marked'

const add = function(req,res,next){
	let time = (new Date()).toLocaleString()
	let newPost = {
		title:req.body.title,
		post:marked(req.body.post),
		time:time,
		author:req.session.userInfo.username,
		pv:0,
		code:uuid.v4()
	}
	postProxy.createPost(newPost,(err,post)=>{
		if(err){
			return next(err)
		}
		return res.json({key:1,post:post})
	})
}
export { add }