var _ = require('lodash'),
	async = require('async'),
	request = require('request'),
	LatLon = require('geodesy').LatLonSpherical,
	RouteBoundingBox = require('./lib/factories/route-bounding-box.factory');

var url = 'http://127.0.0.1:9999/api/road/:roadName';

var points,
	latLon;

request(url.replace(':roadName', 'M271'), function (err, resp, body) {
	points = JSON.parse(body);
	RouteBoundingBox.parse(points);
	console.log(points);
});