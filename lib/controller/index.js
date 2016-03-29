'use strict';


var HActrl = require('./highway-agency.controller'),
	Dctrl = require('./dangerous-roads.controller'),
	POIctrl = require('./poi.controller'),
	OSRMctrl = require('./osrm.controller');


function init(dbPoi, dbOpenStreet, osrmURL, router) {
	HActrl.init(dbPoi);
	Dctrl.init(dbPoi);
	POIctrl.init(dbPoi);
	OSRMctrl.init(dbOpenStreet, osrmURL);

	router.get('/road/:name', HActrl.find);
	router.get('/dangerousRoads/', Dctrl.find);
	router.get('/refData/roads', HActrl.refData);

	router.get('/poi/:param/:routeName', POIctrl.process);

	router.get('/osrm/:swLat/:swLon/:neLat/:neLon', OSRMctrl.boundingBox);
}

module.exports = {
	init: init
};