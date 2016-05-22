'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	server, 
	router,
	port = 9999,
	overPassRepo,
	OverPassRepository = require('../lib/repositories/over-pass.repository'),
	overPassUrl = 'http://overpass-api.de/api/interpreter';

overPassRepo = new OverPassRepository(overPassUrl);

server = express();
server.use(bodyParser.json());

router = express.Router();

router.get('/api/osrm/:swLat/:swLon/:neLat/:neLon',function(req, resp) {
	osrmSvc.find({
			lat: Number.parse(req.params.swLat),
			lon: Number.parse(req.params.swLon)
		}, {
			lat: Number.parse(req.params.neLat),
			lon: Number.parse(req.params.neLon)
		})
		.then(function (data) {
			resp.status(200).json(data);
		});
});

//server.use(bodyParser.json());


/*getData.connect(dbPoiUrl, dbOpenStreetUrl)
	.spread(function (dbPoi, dbOpenStreet) {*/
	//	server.use('/api/', getData.bind(dbPoi, dbOpenStreet, overPassUrl));
		server.listen(port, function () {
			console.log('http server started ... listening at', port);
		});
/*	});*/