var MongoClient = require('mongodb').MongoClient,
	Q = require('q'),
	assert = require('assert');

// Connection URL
var url = 'mongodb://192.168.1.107:27017/poidb';
// Use connect method to connect to the Server

var _db;

function connect(url) {

	var deffered = new Q.defer();
	console.log('attempting to connecto to : ', url);
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log('db connected ... ');
		_db = db;
		deffered.resolve(db);
	});

	return deffered.promise;
}

module.exports = {
	connect: connect,
	db: function dbAccessor() {
		return _db;
	}
};