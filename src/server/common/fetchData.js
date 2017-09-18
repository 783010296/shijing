
import News from '../models/news.js'
import express from 'express'
import superagent from 'superagent'
import cheerio from '../../../node_modules/cheerio/lib/cheerio'

const router = express.Router()

router.get('/fetchNews',(req,res)=>{
	superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return console.log(err);
      }
      var $ = cheerio.load(sres.text);
      $('#topic_list .cell').each(function (idx, element) {
      	var $element = $(element);
      	var newNews = {
      		author:$element.find('.user_avatar').find('img').attr('title'),
      		title:$element.find('.topic_title').attr('title'),
      		url:$element.find('.topic_title').attr('href')
      	}
        News.create(newNews,(err,news)=>{
        	if(err){
        		return console.log(err);
        	}
          console.log(news)
      	})
      });
      res.json({key:sres.text});
    });
})

export default router