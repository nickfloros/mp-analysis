var Q = require('q'),
	DbService = require('./lib/service/db.service'),
	OverPassRepo = require('./lib/repositories/over-pass.repository'),
	OpenStreetNodes = require('./lib/repositories/open-street-nodes.repository'),
	OpenStreetWays = require('./lib/repositories/open-street-ways.repository'),
	LatLon = require('geodesy').LatLonSpherical,
	OsGridRef = require('geodesy').OsGridRef,
	dbUrl = 'mongodb://127.0.0.1:27017/openStreet',
	overPassUrl = 'http://overpass-api.de/api/interpreter',
	nodes,
	ways,
	overPass, deferred;

var osGrid = new OsGridRef(437329, 113786);
var point = OsGridRef.osGridToLatLon(osGrid);

overPass = new OverPassRepo(overPassUrl);
var to = point.destinationPoint(100, 45.0);
var to4 = point.destinationPoint(100, 45.0 - 180.0);

deferred = overPass.find(point.destinationPoint(300, 45.0 - 180.0),
	point.destinationPoint(300, 45.0));

DbService.connect(dbUrl)
	.then(function (db) {
		nodes = new OpenStreetNodes(db);
		ways = new OpenStreetWays(db);
		deferred.then(function (data) {

			Q.all([nodes.removeDoublicates(data.nodes),
					ways.removeDoublicates(data.ways)
				])
				.spread(function (nodesToWrite, waysToWrite) {
					return Q.all([nodes.write(nodesToWrite),
						ways.write(waysToWrite)
					])
				})
				.spread(function (nodesResolved, waysResolved) {
					process.exit(0);
				});

		});
		console.log('data connected');
	});