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
import bodyParser from 'body-parser'
const app = express()

const port = process.env.PORT || 8090

mongoose.connect(settings.url,{useMongoClient: true})
mongoose.Promise = global.Promise
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection success');  
});
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
}); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('src/dist'))
app.use('/api/user',user)
app.listen(port,() => {
	console.log('app is listening on port 8090')
})

export default app
