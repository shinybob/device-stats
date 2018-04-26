var MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    async = require('async'),
    assert = require('assert');

var url = 'mongodb://shinybob:kennard@ds159509.mlab.com:59509/device-stats';
var _db, devices;

exports.init = function (callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to MongoDB server.");
        _db = db;

        // Got the connection, now get the recipes collection. It's easy.
        devices = _db.collection("devices");
        exports.devices = devices;
        callback(null);
    });
};


exports.addDevice = function(data) {
    console.log('saving to database...');
    console.log('****************************************');
    console.log(JSON.stringify(output));
    console.log('****************************************');


    async.waterfall([
            function (cb) {
                data = JSON.parse(JSON.stringify(data));
                data.cell_id = 'id' + Date.now();
                devices.insertOne(data, { w: 1 }, cb);
            }
        ], function (err, results) {
            console.log('done!');
        });
};

exports.devices = null;
