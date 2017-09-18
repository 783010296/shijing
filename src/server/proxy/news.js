import * as Models from '../models/'
const newsModel = Models.newsModel

//回调函数模式
const getNewsByTitle = function(name,callback){
	newsModel.findOne({title:name},callback)
}

//也可以写成promise模式，后续通过then和catch处理
// const getNewsByTitle = function(name,callback){
// 	return newsModel.findOne({title:name})
// }

const getAllNew = function(callback){
	newsModel.find([],callback)
}

export { getNewsByTitle,getAllNew }