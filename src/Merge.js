const MongoClient = require('mongodb').MongoClient;

/**
 * Updates DB1 with values from DB2 based on testObjectName
 */

// Public
const DB_1_URL = 'mongodb://shinybob:kennard@ds159509.mlab.com:59509/device-stats';
const DB_1_NAME = 'device-stats';
const DB_1_COLLECTION = 'deviceStats';

// Private
const DB_2_URL = 'mongodb://localhost:27017/device-stats';
// const DB_2_URL = 'mongodb://10.225.179.18:27017/device-stats';
const DB_2_NAME = 'device-stats';
const DB_2_COLLECTION = 'devices';

init();

async function init() {

    let db1 = await connect(DB_1_URL, DB_1_NAME, DB_1_COLLECTION);
    let db2 = await connect(DB_2_URL, DB_2_NAME, DB_2_COLLECTION);

    let list1 = await getDevices(db1);

    let devicesToAdd = [];
    
    for (var value1 of list1) {

        let make = getMake(value1.deviceName);
        let model = formatModel(make, value1.deviceName);   

        devicesToAdd.push({
            testObject:true,
            testObjectName:value1.deviceName,
            make:make,
            model:model,
            screenWidth:value1.width,
            screenHeight:value1.height,
            pixelRatio:value1.devicePixelRatio,
            userAgent:value1.userAgent,
            renderer:value1.renderer,
            maxAnisotropy:value1.maxAnisotropy,
            active:false,
            platform:'mobile'
        });
    }

    try {
        // db2.deleteMany( { testObject : true } ).then(() => {
            // console.log ('done deleting');
            devicesToAdd.forEach(element => {
                db2.updateOne({testObjectName:element.testObjectName}, element, {upsert:true});
                console.log ('adding: ' + element.testObjectName);
            });
        // })
        // .catch(e => {
            // console.log (e);
        // });
    } catch (e) {
        console.log (e);
    }
}

function formatModel(make, deviceName) {
    if(!isApple(make)) {
        deviceName = deviceName.substr(deviceName.indexOf('_') + 1);
    }

    if(deviceName.indexOf('_real') > -1) {
        deviceName = deviceName.substr(0, deviceName.indexOf('_real'));
    };

    if(deviceName.indexOf('_gsys') > -1) {
        deviceName = deviceName.substr(0, deviceName.indexOf('_gsys'));
    };

    if(deviceName.indexOf('_free') > -1) {
        deviceName = deviceName.substr(0, deviceName.indexOf('_free'));
    };

    deviceName = deviceName.split('_').join(' ');

    return deviceName;
}

function getMake(deviceName) {
    let make = deviceName.split('_')[0];

    if(make.length <= 4) {
        make = make.toUpperCase();
    } else {
        make = make.charAt(0).toUpperCase() + make.slice(1).toLowerCase();
    }

    if(isApple(make)) {
        make = 'Apple';
    }

    return make
}

function isApple(make) {
    return (
        make.toLowerCase() === 'ipad' || 
        make.toLowerCase() === 'iphone' ||
        make.toLowerCase() === 'apple');
}

function getDevices(db) {
    let values = [];
    let cursor = db.find({});

    cursor.on('data', device => {
        values.push(device);
    });

    return new Promise(resolve => {
        cursor.on('end', () => {
            resolve(values);
        });
    });
}

function connect(url, name, collection) {
    return new Promise((resolve, reject) => {
            MongoClient.connect(url)
                .then(client => {
                    databaseInstance = client.db(name);
                    resolve(databaseInstance.collection(collection));
                })
                .catch(error => {
                    if (error) {
                        reject(error);
                    }
                });
      });
}