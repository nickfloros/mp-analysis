'use strict';

var _ = require('lodash'),
	PoiRepository = require('../repositories/poi.repository'),
	_poiRepo;

function init(db) {
	_poiRepo = new PoiRepository(db);
}

function processes(req, resp) {
	console.log(req.params);
	console.log(req.query);

	resp.status(200).json({
		a: 1
	});
}

module.exports = {
	init: init,
	process: processes
};