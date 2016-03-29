var request = require("request");
//var points = '50.746,7.154,50.748,7.157';
var points = '50.92169467022359,-1.4712947412201134,50.92296591011478,-1.4692834813916575';
var payload = 'data=[out:json];(' +
	'node["highway"](' + points + ');' +
	'way["highway"](' + points + ');' +
	'relation["highway"](' + points + ');' +
	');out body;';

var options = {
	method: 'POST',
	url: 'http://overpass-api.de/api/interpreter',
	headers: {
		'cache-control': 'no-cache',
		'content-type': 'text/plain'
	},
	body: payload
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});