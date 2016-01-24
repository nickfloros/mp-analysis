'use strict';


var HActrl = require('./highway-agency.controller'),
		Dctrl = require('./dangerous-roads.controller')


function init(db, router) {
	HActrl.init(db);
	Dctrl.init(db);

	router.get('/road/:name', HActrl.find);
	router.get('/dangerousRoads/', Dctrl.find);
	router.get('/refData/roads',HActrl.refData);
}

module.exports = {
	init : init
};
