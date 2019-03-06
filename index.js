const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/static-assets"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
    console.log("Web sever started @ http://localhost:" + app.get('port'));
});