import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	username:String,
	password:String,
	regTime:String,
	lastLogin:String
})

mongoose.model('Users',userSchema)

