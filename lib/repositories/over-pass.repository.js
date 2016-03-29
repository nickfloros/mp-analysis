'use strict';

var _ = require('lodash'),
	request = require('request'),
	Q = require('q');

function OverPassRepository(url) {
	var _repo = this,
		_url = url ? url : 'http://overpass-api.de/api/interpreter';

	_.extend(_repo, {
		find: function (pointA, pointB) {
			var deferred = Q.defer(),
				points = pointA.lat + ',' + pointA.lon + ',' + pointB.lat + ',' + pointB.lon,
				payload = 'data=[out:json];(' +
				'node["highway"](' + points + ');' +
				'way["highway"](' + points + ');' +
				'relation["highway"](' + points + ');' +
				');out body;';

			request({
				method: 'POST',
				url: _url,
				headers: {
					'cache-control': 'no-cache',
					'content-type': 'text/plain'
				},
				body: payload
			}, function (err, resp, body) {
				var dataSet,
					nodes = [],
					ways = [];
				if (err) {
					deferred.reject(err);
				} else {
					dataSet = JSON.parse(body);
					_.forEach(dataSet.elements, function (item) {
						if (item.type === 'node') {
							nodes.push(item);
						} else {
							ways.push(item);
						}
					});
					deferred.resolve({
						nodes: nodes,
						ways: ways
					});
				}


			});
			return deferred.promise;
		}
	});
}

module.exports = OverPassRepository;