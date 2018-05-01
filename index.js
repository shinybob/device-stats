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

app.post('/screenStats', function(sReq, sRes){
    db.addDevice(sReq.body);
    sRes.send(sReq.body);
});

app.get('/screenStats', function(sReq, sRes){
    db.getDevices(function(result) {
        sRes.send(result);
    })
});

app.post('/delete', function(sReq, sRes){
    db.deleteDevice(sReq.body.cell_id, function() {
        sRes.send({success:true});
    });
});