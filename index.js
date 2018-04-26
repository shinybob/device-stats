const fs = require('fs-extra');
const express = require('express');
const db = require("/db");

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/static-assets"));


db.init(function (err) {
    if (err) {
        console.log("Error initialising DB, aborting: " + JSON.stringify(err, 0, 2));
        exit(-1);
    } else {
        console.error("DB initialised...");
        console.error("Starting Server...");
        app.listen(app.get('port'), () => {
            console.log("Web sever started @ http://localhost:" + app.get('port'));
        });
    }
});

app.get('/screenStats', function(sReq, sRes){
    var output = {};

    output.name = sReq.query.deviceName;
    output.manafacturer = sReq.query.manufacturer;
    output.userAgent = sReq.query.userAgent;

    output.sizes = {};
    output.sizes.screen = {};
    output.sizes.screen.width = sReq.query.screenWidth;
    output.sizes.screen.height = sReq.query.screenHeight;

    output.sizes.browserUI = {};

    output.sizes.browserUI.portrait = {};
    output.sizes.browserUI.portrait.top = (sReq.query.screenHeight - sReq.query.innerHeightPortrait) / 2;
    output.sizes.browserUI.portrait.bottom = (sReq.query.screenHeight - sReq.query.innerHeightPortrait) / 2;

    output.sizes.browserUI.landscape = {};
    output.sizes.browserUI.landscape.top = (sReq.query.screenWidth - sReq.query.innerHeightLandscape) / 2;
    output.sizes.browserUI.landscape.bottom = (sReq.query.screenWidth - sReq.query.innerHeightLandscape) / 2;

    output.sizes.deviceFrame = {};
    output.sizes.deviceFrame.top = 20;//sReq.query.deviceFrameTop;
    output.sizes.deviceFrame.bottom = 20;//sReq.query.deviceFrameBottom;
    output.sizes.deviceFrame.left = 5;//sReq.query.deviceFrameLeft;
    output.sizes.deviceFrame.right = 5;//sReq.query.deviceFrameRight;

    output.viewport = {};
    output.viewport.deviceScaleFactor = sReq.query.devicePixelRatio;
    output.viewport.isMobile = true;
    output.viewport.hasTouch = true;
    output.viewport.isLandscape = true;
    output.viewport.isTablet = true;

    // fs.writeJson('static-assets/saved/' + sReq.query.deviceName + '.json', output);

    console.log('****************************************');
    console.log(JSON.stringify(output));
    console.log('****************************************');
    console.log('Saved');

    sRes.send('Thanks :)');
});