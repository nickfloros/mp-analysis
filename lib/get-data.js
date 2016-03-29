var Q = require('q'),
	DbService = require('./service/db.service'),
	express = require('express'),
	controller = require('./controller');


function connect(dbPointUrl, dbOpenStreetUrl) {
	return Q.all([DbService.connect(dbPointUrl),
		DbService.connect(dbOpenStreetUrl)
	]);
}

function bind(dbPoi, dbOpenStreet, overPassUrl) {
	var route = express.Router();
	controller.init(dbPoi, dbOpenStreet, overPassUrl, route);
	return route;
}

module.exports = {
	bind: bind,
	connect: connect
};