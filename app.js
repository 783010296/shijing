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
import user from './src/server/routes/user'
import pretice from './src/server/routes/pretice'
import news from './src/server/common/fetchData'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const app = express()

mongoose.connect(settings.url,{useMongoClient: true})
mongoose.Promise = global.Promise
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection success');  
});
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});


let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));

const port = process.env.PORT || 8090
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('src/dist'))
app.use('/api/user',user)
app.use('/api/pretice',pretice)
app.use('/',news)
app.listen(port,() => {
	console.log('app is listening on port 8090')
})

app.use(function(err,req,res,next){
	console.log('err-->',err);
	res.json({key:0,err:err})
})

export default app
