const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = class Server {

    constructor(main) {
        this.main = main;
        this.app = express();
        this.port = 5000;

        // this.app.use(morgan('dev'));
        this.app.use(express.static(__dirname + '/static-assets'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.setupMessaging();
    }

    setupMessaging() {
        // this.app.get('/report', this.report.bind(this));
        // this.app.get('/update', this.update.bind(this));
        // this.app.post('/capture', this.capture.bind(this));
    }

    startServer(onSuccess) {
        this.app.listen(this.port, () => {
            onSuccess(this.port);
        });
    }
};
