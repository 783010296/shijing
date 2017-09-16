import express from 'express'
const router = express.Router()

import News from '../models/news'


router.get('/getNews',(req,res)=>{
	News.find({}).then(news=>{
		res.json({key:1,news:news})
	}).catch(err=>{
		res.json({key:0,err:err})
	})
})

export default router