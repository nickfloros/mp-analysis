'use strict';


var DanerousRoadsRepo = require('../repositories/dangerous-roads.repository'),
	_repo;

function getDangerousRoads(req, resp) {

	_repo.find(req.params.name)
		.then(function(dataSet) {
				resp.status(200).json(dataSet);
			},
			function onError(err) {
				resp.status(500).json(err);
			});
}

function init(db, router) {
	_repo = new DanerousRoadsRepo(db);
}

module.exports = {
	init: init,
	find: getDangerousRoads,
};