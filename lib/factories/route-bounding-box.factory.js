'use strict';
var _ = require('lodash'),
	OsGridRef = require('geodesy').OsGridRef,
	LatLon = require('geodesy').LatLonSpherical;

function routeBoundingBox(routePoints) {
	var osGridPoints = [],
		boundingBox = [],
		isPointInList = false,
		points = [],
		latLon;


	// debupe points
	_.forEach(routePoints, function (point) {
		isPointInList = _.find(osGridPoints, function (item) {
			return item.easting === point.easting && item.northing === point.northing;
		});

		if (_.isUndefined(isPointInList)) {
			osGridPoints.push({
				easting: point.easting,
				northing: point.northing
			});
			points.push({
				lat: point.latitude,
				lon: point.longitude
			});
		}

	})

	_.forEach(points, function (point) {

		isPointInList = _.find(boundingBox, function (box) {
			return (box.sw.lat < point.lat && point.lat < box.ne.lat) && (box.sw.lon < point.lon && point.lon < box.ne.lon);
		});

		if (_.isUndefined(isPointInList)) {
			latLon = new LatLon(point.lat, point.lon);
			boundingBox.push({
				sw: latLon.destinationPoint(300, 45.0 - 180.0),
				ne: latLon.destinationPoint(300, 45.0)
			});
		}
	});

	return boundingBox;
}

module.exports = {
	parse: routeBoundingBox
}