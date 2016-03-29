'use strict';

var _ = require('lodash'),
	Q = require('q');

function OpenStreetWaysRepository(db) {
	var _repo = this,
		_db;

	if (db) {
		_db = db.collection('ways');
	}

	_.extend(_repo, {
		write: function writeQuery(data) {
			var deferred = Q.defer();

			if (data.length > 0) {
				_db.insert(data, {
					w: 0
				}, function (err, result) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve();
					}
				});
			} else {
				deferred.resolve();
			}
			return deferred.promise;
		},
		removeDoublicates: function checkIds(dataSet) {
			var deferred = Q.defer(),
				cleansedSet = [],
				ids = [],
				mIds = [];
			// pull out ids ..
			_.forEach(dataSet, function (item) {
				ids.push(item.id);
			});

			_db.find({
				id: {
					$in: ids
				}
			}, {
				id: 1,
				_id: 0
			}).toArray(function (err, machedIds) {
				if (err) {
					deferred.reject(err);
				} else {
					_.forEach(machedIds, function (item) {
						mIds.push(item.id);
					});
					if (mIds.length > 0) {
						_.forEach(dataSet, function (item) {
							if (mIds.indexOf(item.id) === -1) {
								cleansedSet.push(item);
							}
						});
						deferred.resolve(cleansedSet);
					} else {
						deferred.resolve(dataSet);
					}
				}
			});
			return deferred.promise;
		},
		find: function findQuery(query) {
			var deferred = Q.defer();

			_db.find(query).toArray(function (err, result) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(result);
				}
			});

			return deferred.promise;
		}
	});


}

module.exports = OpenStreetWaysRepository;