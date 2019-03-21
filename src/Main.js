const Server = require("./Server");
const MongoClient = require('mongodb').MongoClient;

module.exports = class Main {

    constructor() {
        this.setupDatabase();
    }

    setupDatabase() {
        const url = 'mongodb://shinybob:kennard@ds159509.mlab.com:59509/device-stats';

        MongoClient.connect(url, (error, db) => {
            if(error) {
                console.error("Error connecting to database!");
            } else {
                console.info("Connected to database");
                this.db = db.collection('deviceStats');
                this.setupServer();
            }
        });
    }

    setupServer() {
        this.server = new Server(this);
        this.server.startServer(this.onServerCreated.bind(this));
    }

    onServerCreated(port) {
        console.info("Server created on port:" + port);
    }

    addDevice(deviceData) {
        try {
            console.log('addDevice');
            this.db.insertOne( deviceData );
         } catch (e) {
            console.log (e);
         };
    }

    async getDeviceList() {
        try {
            console.log('getDeviceList');
            let devices = await this.getDevices();
            let formatted = this.formatDeviceList(devices);
            return formatted;
         } catch (e) {
            console.log (e);
         };
    }
    
    getDevices() {
        let values = [];
        let cursor = this.db.find({});

        cursor.on('data', device => {
            values.push(device);
        });

        return new Promise(resolve => {
            cursor.on('end', () => {
                resolve(values);
            });
        });
    }

    formatDeviceList(result) {
        let devices = [];

        result.forEach(data => {
            let device = {
                deviceName: data.deviceName,
                renderer: data.renderer,
                width: data.width,
                height: data.height,
                maxAnisotropy: data.maxAnisotropy,
                devicePixelRatio: data.devicePixelRatio,
                width: data.width
            };

            devices.push(device);
        });

        return devices;
    }
};
