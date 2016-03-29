'use strict';

var
	_ = require('lodash'),
	OverPassRepo = require('../repositories/over-pass.repository'),
	OpenStreetNodes = require('../repositories/open-street-nodes.repository'),
	OpenStreetWays = require('../repositories/open-street-ways.repository'),

	overPassUrl = 'http://overpass-api.de/api/interpreter';

function PointService(db) {

	var _scv = this,
		nodes,
		ways,
		overPass;

	if (db) {
		overPass = new OverPassRepo(overPassUrl);
		nodes = new OpenStreetNodes(db);
		ways = new OpenStreetWays(db);
	}


	_.extend(_svc, {

		process: function pointProcess(point) {
			var deferred = Q.defer();

			overPass.find(point.destinationPoint(300, 45.0 - 180.0),
					point.destinationPoint(300, 45.0))
				.then(function (data) {
					Q.all([nodes.removeDoublicates(data.nodes),
							ways.removeDoublicates(data.ways)
						])
						.spread(function (nodesToWrite, waysToWrite) {
							return Q.all([nodes.write(nodesToWrite),
								ways.write(waysToWrite)
							])
						})
						.spread(function (nodesResolved, waysResolved) {
							deferred.resolve(true);
						});

				});

			return deferred.promise;
		}
	});
}

module.exports = PointService;