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
			},
			recordTypes: function recordsTypes() {
				return [{
					code: 'BETWEEN_JUNCTIONS',
					name: 'Between Junctions'
				}, {
					code: 'JUNCTION',
					name: 'Junction'
				}, {
					code: 'OFF-NETWORK',
					name: 'Off network'
				}, {
					code: 'PLACE',
					name: 'Place'
				}, {
					code: 'SERVICES',
					name: 'Services'
				}, {
					code: 'SLIP',
					name: 'Slip road'
				}, {
					code: 'TUNNEL',
					name: 'Tunnel'
				}, {
					code: 'WITHIN_JUNCTION',
					name: 'Within junction'
				}];
			},
			locationTypes: function locationTypes() {
				return [{
					code: '2GCAM',
					name: 'Camera (with 5 digit 2nd Generation ID)'
				}, {
					code: 'APTRERT',
					name: 'Telephones not connected via HATMS'
				}, {
					code: 'CAM',
					name: 'Other camera'
				}, {
					code: 'ERA',
					name: 'Emergency Refuge Area (Lay-by)'
				}, {
					code: 'ERT',
					name: 'Telephones connected via HATMS'
				}, {
					code: 'INSERTMP',
					name: 'MP inserted by interpolation'
				}, {
					code: 'JSA',
					name: 'Junction service area (without its own slip roads)'
				}, {
					code: 'JUNCTION',
					name: 'Junction'
				}, {
					code: 'LAMPCOL',
					name: 'A lighting column'
				}, {
					code: 'LINK',
					name: 'A stretch of carriageway between junctions or one of the main '
				}, {
					code: 'LINKMP',
					name: 'MP on a link'
				}, {
					code: 'LINKROAD',
					name: 'Interchange link road'
				}, {
					code: 'LINKROADMP',
					name: 'MP on a link road'
				}, {
					code: 'OMSA',
					name: 'On-motorway service area (with its own slip roads)'
				}, {
					code: 'PLACE',
					name: 'Any other place name'
				}, {
					code: 'POSTAL',
					name: 'Postal address'
				}, {
					code: 'ROUNDABOUT',
					name: 'Roundabout'
				}, {
					code: 'SASLIP',
					name: 'Service area slip road'
				}, {
					code: 'SGN',
					name: 'Message sign'
				}, {
					code: 'SIG',
					name: 'Signal site'
				}, {
					code: 'SLIP',
					name: 'Slip road'
				}];
			},
		});
}


module.exports = HighwayAgencyRepository;