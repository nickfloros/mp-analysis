var assert = require('assert'),
	express = require('express'),
	controller = require('./controller');
	DbService = require('./service/db.service');

function connect(dbUrl) {
	return DbService.connect(dbUrl);
}

function bind() {
	var route = express.Router();
	controller.init(DbService.db(),route);
	return route;
}

module.exports = {
	bind : bind,
	connect : connect
};


