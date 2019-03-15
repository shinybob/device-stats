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
                console.info(this.db);
                this.setupServer();
            }
        });
    }

    setupServer() {
        this.server = new Server(this.addDevice.bind(this));
        this.server.startServer(this.onServerCreated.bind(this));
    }

    onServerCreated(port) {
        console.info("Server created on port:" + port);
    }

    addDevice(deviceData) {
        try {
            console.log('addDevice');
            console.log(deviceData);
            this.db.insertOne( deviceData );
         } catch (e) {
            console.log (e);
         };
    }
};
