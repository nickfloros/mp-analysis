'use strict';

var _ = require('lodash'),
	OSRMService = require('../service/osrm.service'),
	osrmSvc;

function init(db, osrmURL) {
	osrmSvc = new OSRMService(db, osrmURL);
}

function boundingBox(req, resp) {
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
}

module.exports = {
	init: init,
	boundingBox: boundingBox
};