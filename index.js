const express = require('express');
const db = require("./db");
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/static-assets"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.init(function (err) {
    if (err) {
        console.log("Error initialising DB, aborting: " + JSON.stringify(err, 0, 2));
        exit(-1);
    } else {
        console.error("DB initialised...\nStarting Server...");
        app.listen(app.get('port'), () => {
            console.log("Web sever started @ http://localhost:" + app.get('port'));
        });
    }
});

app.post('/addDevice', function(sReq, sRes){
    db.addDevice(sReq.body);
    sRes.send(sReq.body);
});

app.get('/devices', function(sReq, sRes){
    db.getDevices(function(result) {
        const devices = [];

        for(var data of result) {
            const device = {};
            device.name = data.model;
            device.manafacturer = data.make;
            device.userAgent = data.userAgent;
            device.sizes = {
                screen: {
                    width:data.screenWidth,
                    height:data.screenHeight
                },
                window: {
                    portrait: {
                        width:data.innerWidthPortrait,
                        height:data.innerHeightPortrait
                    },
                    landscape: {
                        width:data.innerWidthLandscape,
                        height:data.innerHeightLandscape
                    },
                },
                browserUI: {
                    portrait:data.screenHeight - data.innerHeightPortrait,
                    landscape:data.screenWidth - data.innerHeightLandscape
                },
                deviceFrame: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            };

            device.viewport = {
                deviceScaleFactor:data.pixelRatio,
                isMobile:true,
                hasTouch:true,
                isLandscape:false,
                isTablet:true,
            };

            devices.push(device);
        }

        sRes.send(devices);
    })
});

app.get('/deviceList', function(sReq, sRes){
    db.getDevices(function(result) {
        sRes.send(result);
    })
});

app.post('/delete', function(sReq, sRes){
    db.deleteDevice(sReq.body.cell_id, function() {
        sRes.send({success:true});
    });
});

app.post('/update', function(sReq, sRes){
    db.update(sReq.body.data, function() {
        sRes.send({success:true});
    });
});