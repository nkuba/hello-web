const express      = require('express');
const http         = require('http');
const os           = require('os');

const app          = express();

const APP_PORT     = 80;

const hostname = os.hostname();

// Add timestamp to log output
require('console-stamp')(console, '[HH:MM:ss.l]');

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log('Received request')
    res.render('index', { hostname: hostname })
})

app.listen(APP_PORT)

console.log('Web server started on host: ' + hostname + ', port: ' + APP_PORT);
