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
            if(data.active === true) {
                const device = {
                    make: data.make,
                    model: data.model,
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
                    browser: {
                        name: data.browser,
                        version: data.browserVersion,
                        portraitSize:data.browserUIPortrait,
                        landscapeSize:data.browserUILandscape,
                        type: data.layout
                    },
                    os: {
                        name: data.os,
                        version: data.osVersion,
                    },
                    pixelRatio: data.pixelRatio,
                    userAgent: data.userAgent,


                };

                devices.push(device);
            }
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