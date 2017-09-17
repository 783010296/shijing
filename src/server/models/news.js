import mongoose from 'mongoose'

const newsSchema = mongoose.Schema({
	author:String,
	title:String,
	url:String
})

mongoose.model('News',newsSchema)
