import mongoose from 'mongoose'

//models
import './news'
import './user'

const newsModel = mongoose.model('News')
const userModel = mongoose.model('Users')

export {newsModel,userModel}//models统一出口