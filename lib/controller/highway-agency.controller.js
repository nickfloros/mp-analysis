'use strict';


var HArepo = require('../repositories/highway-agency.repository'),
	_repo;

function findByRoadName(req, resp) {

	_repo.findByName(req.params.name)
		.then(function(dataSet) {
				resp.status(200).json(dataSet);
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
	refData: function(req, resp) {

		resp.status(200).json({
			recordTypes: _repo.recordTypes(),
			locationTypes: _repo.locationTypes()
		});
	},
};