'use strict';

var _ = require('lodash'),
	Q = require('q');

function DangerousRoads(db) {
	var _repo = this,
		_db = db.collection('dangerousRoads');

	_.extend(_repo, {
		find: function findByName(name) {
			var deffered = new Q.defer();
			_db.find({})
				.toArray(function(err, dataSet) {
					if (err) {
						deffered.reject(err);
					} else {
						deffered.resolve(dataSet);
					}
				});

			return deffered.promise;
		}
	});
}


module.exports = DangerousRoads;