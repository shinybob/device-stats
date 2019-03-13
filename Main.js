const Server = require("./Server");

module.exports = class Main {

    constructor() {
        this.setupDatabase();
    }

    setupDatabase() {
        console.log('setupDatabase')
        this.setupServer();
    }

    setupServer() {
        console.log('setupServer')
        this.server = new Server(this);
        this.server.startServer(this.onServerCreated.bind(this));
    }

    onServerCreated(port) {
        console.info("Server created on port:" + port);
    }
};
