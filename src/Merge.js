const MongoClient = require('mongodb').MongoClient;

const DB_1_URL = 'mongodb://shinybob:kennard@ds159509.mlab.com:59509/device-stats';
const DB_1_NAME = 'device-stats';
const DB_1_COLLECTION = 'deviceStats';

const DB_2_URL = 'mongodb://10.225.179.18:27017/device-stats';
const DB_2_NAME = 'device-stats';
const DB_2_COLLECTION = 'devices';

init();

async function init() {

    let db1 = await connect(DB_1_URL, DB_1_NAME, DB_1_COLLECTION);
    let db2 = await connect(DB_2_URL, DB_2_NAME, DB_2_COLLECTION);

    let list1 = await getDevices(db1);
    let list2 = await getDevices(db2);
    let devicesToAdd = [];
    
    for (var value1 of list1) {
        let found = false;

        for (var value2 of list2) {
            if(value1.deviceName === value2.testObjectName) {
                found = true;
            }
        }

        if(!found) {
            devicesToAdd.push({
                testObject:true,
                testObjectName:value1.deviceName,
                model:value1.deviceName,
                screenWidth:value1.width,
                screenHeight:value1.height,
                pixelRatio:value1.devicePixelRatio,
                userAgent:value1.userAgent,
                renderer:value1.renderer,
                maxAnisotropy:value1.maxAnisotropy,
                active:false,
                platform:'mobile',
            });
        }
    }

    try {
        db2.insertMany( devicesToAdd );
        console.log ('done');
     } catch (e) {
        console.log (e);
     }
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