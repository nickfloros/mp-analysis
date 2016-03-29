'use strict';


var HArepo = require('../repositories/highway-agency.repository'),
	RouteBoundingBox = require('../factories/route-bounding-box.factory'),
	_repo;

function findByRoadName(req, resp) {

	_repo.findByName(req.params.name)
		.then(function (dataSet) {
				resp.status(200).json(RouteBoundingBox.parse(dataSet));
			},
			function onError(err) {
				resp.status(500).json(err);
			});
}

function init(db) {
	_repo = new HArepo(db);
}

module.exports = {
	init: init,
	find: findByRoadName,
	refData: function (req, resp) {

		resp.status(200).json({
			recordTypes: _repo.recordTypes(),
			locationTypes: _repo.locationTypes()
		});
	},
};