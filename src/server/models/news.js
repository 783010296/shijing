import mongoose from 'mongoose'

const newsSchema = mongoose.Schema({
	img:String,
	title:String,
	url:String
})

export default mongoose.model('News',newsSchema)
