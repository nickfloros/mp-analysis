'use strict';

var _ = require('lodash'),
	Q = require('q'),
	PoiQueryFactory = require('../factories/poi-query.factory');

function PoiRepository(db) {
	var _repo = this,
		_db = db.collection('pois'),
		_find = function find(query) {
			var deferred = new Q.defer();
			_db.find(query).toArray(function toArray(err, dataSet) {
				if (err) {
					deffered.reject(err);
				} else {
					deferred.resolve(dataSet);
				}
			});
			return deferred.promise;
		};

	_.extend(_repo, {
		junctions: function junctions(roadName, junctionName) {
			return _find(PoiQueryFactory.junctions(routeName, junctionName));
		},
		markerPosts: function markerPosts(roadName, markerPostName) {
			return _find(PoiQueryFactory.markerPosts(roadName, markerPostName));
		},
		sosBoxes: function sosBoxes(routeName, sosBoxName) {
			return _find(PoiQueryFactory.sosBoxes(routeName, sosBoxName));
		}
	});
}

module.exports = PoiRepository;