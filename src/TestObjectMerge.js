const MongoClient = require('mongodb').MongoClient;

module.exports = class TestObjectMerge {
    constructor() {
        this.setup();
    }

    async setup() {
        // Public
        const TO_DB_URL = 'mongodb://shinybob:kennard@ds159509.mlab.com:59509/device-stats';
        const TO_DB_NAME = 'device-stats';
        const TO_DB_COLLECTION = 'deviceStats';
        
        // Private
        // const MONOCLE_DB_URL = 'mongodb://localhost:27017/device-stats';
        const MONOCLE_DB_URL = 'mongodb://10.225.179.18:27017/device-stats';
        const MONOCLE_DB_NAME = 'device-stats';
        const MONOCLE_DB_COLLECTION = 'devices';

        this.testObjectCollection = await connect(TO_DB_URL, TO_DB_NAME, TO_DB_COLLECTION);
        this.monocleCollection = await connect(MONOCLE_DB_URL, MONOCLE_DB_NAME, MONOCLE_DB_COLLECTION);

        console.log('[TestObjectMerge] Setup complete')
    }

    delete() {
        // monocleCollection.deleteMany({testObject:true});
        // console.log('done')
    }

    async merge() {
        let testObjectDevices = await getDevices(this.testObjectCollection);
        
        for (var testObjectData of testObjectDevices) {
            await updateDevice(this.monocleCollection, testObjectData);
        }

        console.log('[TestObjectMerge] Merge complete');

        return ('Merge complete');
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

    return make;
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
            }
        );
    });
}

function updateDevice(collection, testObjectData) {

    let testObjectDeviceName = testObjectData.deviceName;
    let testObjectMake = getMake(testObjectDeviceName);
    let testObjectModel = formatModel(testObjectMake, testObjectDeviceName);  

    return new Promise((resolve, reject) => {
        collection.update(
                { testObjectName:testObjectDeviceName }, 
                { $set: { 
                    testObject:true,
                    testObjectName:testObjectDeviceName,
                    make:testObjectMake,
                    model:testObjectModel,
                    screenWidth:testObjectData.width,
                    screenHeight:testObjectData.height,
                    pixelRatio:testObjectData.devicePixelRatio,
                    userAgent:testObjectData.userAgent,
                    renderer:testObjectData.renderer,
                    maxAnisotropy:testObjectData.maxAnisotropy,
                    date:testObjectData.date,
                    platform:'mobile',
                    cell_id: 'id' + Date.now()}},
                { upsert:true })
            .then(() => {
                console.log('[TestObjectMerge] Adding: ' + testObjectDeviceName);
                resolve();
            })
            .catch(error => {
                if (error) {
                    reject(error);
                }
            }
        );
    });
}