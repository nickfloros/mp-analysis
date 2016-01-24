'use strict';


var HArepo = require('../repositories/highway-agency.repository'),
	_repo;

function getMarkers(req, resp) {
	
	_repo.findByName(req.params.name)
		.then(function (dataSet) {
			resp.status(200).json(dataSet);
		},
		function onError(err) {
			resp.status(500).json(err);
		});
}

function init(db, router) {
	_repo = new HArepo(db);
	router.get('/road/:name', getMarkers);
}

module.exports = {
	init : init
};
