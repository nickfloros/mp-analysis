'use strict';

function poiQuery(categoryId, routeName, searchName) {
	var query = {
		"properties.categoryId" : categoryId,
		"properties.route" : routeName
	} ;

	if (_.isString(searchName)) {
		query["properties.searchName"] = searchName
	};

	return query;
}


function junctionQuery(routeName, searchName) {
	return poiQuery(4514,routeName, searchName);
}

function sosBoxQuery(routeName, searchName) {
	return poiQuery(4504, routeName, searchName) ;
}

function markerPostQuery(routeName, searchName) {
	return poiQuery(4503, routeName, searchName);
}

module.exports = {
	junctions : junctionQuery,
	sosBoxes : sosBoxQuery,
	markerPosts : markerPostQuery
};

