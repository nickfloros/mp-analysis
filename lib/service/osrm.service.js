'use strict';

var _ = require('lodash'),
	Q = require('q'),
	OverPassRepo = require('../repositories/over-pass.repository'),
	OpenStreetNodes = require('../repositories/open-street-nodes.repository'),
	OpenStreetWays = require('../repositories/open-street-ways.repository');

function OSRMService(db, url) {
	var _svc = this,
		overPassRepo = new OverPassRepo(db),
		nodes = new OpenStreetNodes(db),
		ways = new OpenStreetWays(db);

	_.extend(_svc, {
		process: function (pointA, pointB) {
			var deferred = Q.defer();
			overPassRepo.find(pointA, pointB)
				.then(function (osrmData) {
					Q.all([nodes.removeDoublicates(osrmData.nodes),
							ways.removeDoublicates(osrmData.ways)
						])
						.spread(function (nodesToWrite, waysToWrite) {
							return Q.all([nodes.write(nodesToWrite),
								ways.write(waysToWrite)
							]);
						})
						.spread(function (nodesResolved, waysResolved) {
							deferred.resolve({
								nodes: nodesResolved,
								ways: waysResolved
							});
						});
				});
			return deferred.promise;
		}
	});
}

module.exports = OSRMService;