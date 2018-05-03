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

var url = 'mongodb://10.225.179.18:27017/device-stats';
// var url = 'mongodb://localhost:27017/device-stats';
// var url = 'mongodb://sys_admin:Password1@ds159509.mlab.com:59509/device-stats';
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

exports.update = function (cell_data, callback) {

    const data = {
            "active":cell_data.active,
            "make":cell_data.make,
            "model":cell_data.model,
            "pixelRatio":cell_data.pixelRatio,
            "screenWidth":cell_data.screenWidth,
            "screenHeight":cell_data.screenHeight,
            "innerWidthLandscape":cell_data.innerWidthLandscape,
            "innerHeightLandscape":cell_data.innerHeightLandscape,
            "browserUILandscape":cell_data.browserUILandscape,
            "innerWidthPortrait":cell_data.innerWidthPortrait,
            "innerHeightPortrait":cell_data.innerHeightPortrait,
            "browserUIPortrait":cell_data.browserUIPortrait,
            "browser": cell_data.browser,
            "browserVersion": cell_data.browserVersion,
            "deviceType": cell_data.deviceType,
            "layout": cell_data.layout,
            "os": cell_data.os,
            "osFamily": cell_data.osFamily,
            "desc": cell_data.desc,
            "userAgent":cell_data.userAgent,
        };

    console.log('updating device ...');
    console.log('****************************************');
    console.log(data);
    console.log('****************************************');

    async.waterfall([
        function (cb) {
            devices.updateOne({ cell_id: cell_data.cell_id }, {$set: data} , {w: 1}, cb);
        }], function (err) {
        callback(null);
    });
};

exports.addDevice = function(data) {
    console.log('saving device to database...');
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

exports.deleteDevice = function (cell_id, callback) {
    console.log('deleting device from database ' + cell_id + ' ...');

    async.waterfall([
        function (cb) {
            devices.deleteOne({ cell_id: cell_id }, {w: 1}, cb);
        }], function (err) {
        callback(null);
    });
};

exports.getDevices = function (callback) {
    var values = [];
    var cursor = devices.find({});

    cursor.on("data", function (device) {
        values.push(device);
    });

    cursor.on("end", function () {
        callback(values);
    });
};

exports.devices = null;
