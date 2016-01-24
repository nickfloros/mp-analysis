'use strict';

var express = require('express'),
	getData = require('../lib/get-data'),
	bodyParser = require('body-parser'),
	dbUrl = 'mongodb://192.168.1.107:27017/poidb',
	server ;

server = express();

//server.use(bodyParser.json());

getData.connect(dbUrl)
	.then(function () {
		server.use('/api/', getData.bind());
		server.listen(9999,function() {
			console.log('connected ... ');
		}, function (err) {
			console.log('err ', err);
		})
	});
