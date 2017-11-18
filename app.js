/*const express = require('express')
const app = express()
app.use(express.static('src/dist'))
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})*/

/*const pkg = require('./package')
const config = require('./config/db')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(__dirname + '/src/assets/favicon.ico'))
app.use(express.static('dist'))
app.use('/',index)
app.use('/api',movie)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app*/

import express from 'express'
import settings from './settings'
import mongoose from 'mongoose'
import history from 'connect-history-api-fallback'
import user from './src/server/routes/user'
import more from './src/server/routes/more'
import post from './src/server/routes/post'
import news from './src/server/common/fetchData'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';


const app = express()
const session = require('express-session');
const redisStore = require('connect-redis')(session);


mongoose.connect(settings.url,{useMongoClient: true})
mongoose.Promise = global.Promise
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection success');  
});
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});

/*app.use(history())*/

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));

const port = process.env.PORT || 8090
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('src/dist'))
app.listen(port,() => {
	console.log('app is listening on port 8090')
})

app.use(session({
    resave:false,
    saveUninitialized: true,
	secret: settings.cookieSecret,
	key: settings.db,
	cookie: {maxAge: 1000 * 60 * 30},//30 分钟
	store: new redisStore({
		port: settings.redis_port,
	    host: settings.redis_host,
	    db: settings.redis_db,
	    pass: settings.redis_password,
	})
}));


app.use('/api/user',user)
app.use('/api/more',more)
app.use('/api/post',post)
app.use('/',news)


app.use(function(err,req,res,next){
	console.log('err-->',err);
	res.json({key:0,err:err})
})

export default app
