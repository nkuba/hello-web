const express      = require('express');
const http         = require('http');
const os           = require('os');

const app          = express();

const APP_PORT     = 80;

const hostname = os.hostname();

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', { hostname: hostname })
})

app.listen(APP_PORT)

console.log('Web server started on port: ' + APP_PORT);
