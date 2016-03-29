'use strict';

var express = require('express'),
	Q = require('q'),
	getData = require('../lib/get-data'),
	bodyParser = require('body-parser'),
	dbPoiUrl = 'mongodb://127.0.0.1:27017/poidb',
	dbOpenStreetUrl = 'mongodb://127.0.0.1:27017/openStreet',
	overPassUrl = 'http://overpass-api.de/api/interpreter',
	port = 9999,
	server;

server = express();

//server.use(bodyParser.json());

getData.connect(dbPoiUrl, dbOpenStreetUrl)
	.spread(function (dbPoi, dbOpenStreet) {
		server.use('/api/', getData.bind(dbPoi, dbOpenStreet, overPassUrl));
		server.listen(port, function () {
			console.log('http server started ... listening at', port);
		});
	});