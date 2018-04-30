var MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    async = require('async'),
    assert = require('assert');

/************************************************************
 * Running mongo locally
 ************************************************************
 * var url = 'mongodb://localhost:27017/device-stats';
 *
 * Set BD path in seperate terminal
 * mongod --dbpath /db
 ************************************************************/

// var url = 'mongodb://localhost:27017/device-stats';
var url = 'mongodb://sys_admin:Password1@ds159509.mlab.com:59509/device-stats';
var _db, devices;

exports.init = function (callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to MongoDB server.");
        _db = db;

        devices = _db.collection("devices");
        exports.devices = devices;
        callback(null);
    });
};


exports.addDevice = function(data) {
    console.log('saving to database...');
    console.log('****************************************');
    console.log(data);
    console.log('****************************************');

    async.waterfall([
            function (cb) {
                data = JSON.parse(JSON.stringify(data));
                data.cell_id = 'id' + Date.now();
                devices.insertOne(data, { w: 1 }, cb);
            }
        ], function (err, results) {
            if(err) {
                console.error(err);
            } else {
                console.log('done!');
            }
        });
};

exports.getDevices = function (callback) {
    var values = [];

    var cursor = devices.find({}).limit(1);

    cursor.on("data", function (device) {
        values.push(device);
    });

    cursor.on("end", function () {
        callback(values);
    });
};

exports.devices = null;
