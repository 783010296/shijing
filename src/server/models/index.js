import mongoose from 'mongoose'


//models

import './news'
import './user'

//models统一出口
const newsModel = mongoose.model('News')
const userModel = mongoose.model('Users')

export {newsModel,userModel}