"use strict"

var path = require('path');
var express  = require('express');
var app      = express();
var port     = 3000||process.env.MONGODB_URI ;
var index    = require('./router/index')
var configDB = require('./config/dbinit.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

mongoose.connect(configDB.url);
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname+ '/public/')));
app.use('/',index);


app.listen(port,function(){
	console.log('Magic is happend on port 3000');
})
