var MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    async = require('async'),
    assert = require('assert');

// Connection URL
// var url = 'mongodb://localhost:27017/shiny-board';
// var url = 'mongodb://shinybob:kennard@ds049446.mlab.com:49446/shiny-board';
var url = 'mongodb://shinybob:kennard@ds159509.mlab.com:59509/device-stats';
/************************************************************
 * Running locally
 ************************************************************
 *
 * Set BD path in seperate terminal
 * mongod --dbpath /db
 *
 * Then start server
 * npm start
 *
 * Then go to localhost
 * http://localhost:5000/#/cells
 *
 ************************************************************/

var _db;

exports.init = function (callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to MongoDB server.");
        _db = db;

        // Got the connection, now get the recipes collection. It's easy.
        exports.devices = _db.collection("devices");
        callback(null);
    });
}    

// Anybody can just grab this and start making queries on it if they want.
exports.devices = null;
