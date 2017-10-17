import mongoose from 'mongoose'

//models
import './news'
import './user'
import './post'

const newsModel = mongoose.model('News')
const userModel = mongoose.model('Users')
const postModel = mongoose.model('Posts')

export {newsModel,userModel,postModel}//models统一出口