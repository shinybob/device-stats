const express = require('express');
const bodyParser = require('body-parser');

module.exports = class Server {

    constructor(main) {
        this.main = main;
        this.app = express();

        this.app.set('port', (process.env.PORT || 5000));

        this.app.use(express.static('./static-assets'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.setupMessaging();
    }

    setupMessaging() {
        this.app.post('/addDevice', this.addDevice.bind(this));
        this.app.get('/getDeviceList', this.getDeviceList.bind(this));
        this.app.get('/merge', this.merge.bind(this));
    }

    startServer(onSuccess) {
        this.app.listen(this.app.get('port'), () => {
            onSuccess(this.app.get('port'));
        });
    }

    addDevice(req, res) {
        this.main.addDevice(req.body);
    }

    async merge(req, res) {
        var result = await this.main.merge();
        res.send(result);
    }

    async getDeviceList(req, res) {
        var deviceList = await this.main.getDeviceList();
        res.send(deviceList);
    }
};