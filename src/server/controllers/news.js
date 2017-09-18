import * as modelsProxy from '../proxy/'

const newsProxy  = modelsProxy.newsProxy;

const getAllNews = function(req,res,next){
	newsProxy.getAllNew((err,news)=>{
		if(err){
			next(err);
			return res.json({key:0})
		}
		return res.json({key:1,news:news})
	})
}

export { getAllNews }