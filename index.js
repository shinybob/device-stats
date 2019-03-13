import express from 'express';
import bodyParser from 'body-parser';
import Database from './Database';

let app = express();

app.use(express.static(__dirname + '/static-assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.enable('trust proxy');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const PORT = 5000;

let database = new Database();

database
    .init()
    .then(() => {
        console.info('DB initialised...\nStarting Server...');
        let httpsServer = https.createServer(credentials, app);
        httpsServer.listen(PORT, (error) => {
            return new Promise((resolve, reject) => {
                if (error) {
                    reject(error);
                }
                console.info('Server started on port:' + PORT);
                resolve();
            });
        });
    })
    .catch(error => {
        console.error('Error initialising DB, aborting: ' + JSON.stringify(error, 0, 2));
        exit(-1);
    });