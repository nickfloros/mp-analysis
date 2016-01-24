'use strict';

var _ = require('lodash'),
	Q = require('q');

function HighwayAgencyRepository(db) {
	var _repo = this,
		_db = db.collection('highwayAgency');

	_.extend(_repo, {
		findByName: function findByName(name) {
			var deffered = new Q.defer();
			console.log('searching for ', name);
			_db.find({
				road: name
			}).toArray(function(err, dataSet) {
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


module.exports = HighwayAgencyRepository;