//文章模型
import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
	title:String,//文章标题
	post:String,//文章内容
	time:String,//文章时间
	author:String,//文章作者
	pv:String,//文章阅读量
	code:String//文章标识码
})

mongoose.model('Posts',postSchema)//建表Post

