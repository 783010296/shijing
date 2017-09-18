//新闻模型
import mongoose from 'mongoose'

const newsSchema = mongoose.Schema({
	author:String,//作者
	title:String,//标题
	url:String//链接
})

mongoose.model('News',newsSchema)//建立News表
