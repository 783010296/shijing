import News from '../models/news.js'
import express from 'express'
import superagent from 'superagent'
import cheerio from '../../../node_modules/cheerio '

const router = express.Router()

router.get('/fetchNews',(req,res)=>{
	superagent.get('http://news.163.com/world/')
    .end(function (err, sres) {
      if (err) {
        return console.log(err);
      }
      var $ = cheerio.load(sres.text);
      $('.ndi_main .news_article').each(function (idx, element) {
      	var $element = $(element);
      	var newNews = {
      		img:$element.find('.na_pic').find('img').attr('src'),
      		title:$element.find('.news_title').find('a').text(),
      		url:$element.find('.news_title').find('a').attr('href')
      	}
        News.create(newNews,(err,news)=>{
        	if(err){
        		return console.log(err);
        	}
      	})
      });
      res.json({key:sres.text});
    });
})

export default router