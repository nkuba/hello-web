const express      = require('express');
const http         = require('http');
const os           = require('os');

const app          = express();

const APP_PORT     = 3080;

const hostname  = os.hostname();
const version   = process.env.npm_package_version

// Add timestamp to log output
require('console-stamp')(console, '[HH:MM:ss.l]');

// Discover Environment Variables
var vars = []
if(process.env.ENV_VAR1) vars.push(process.env.ENV_VAR1)
if(process.env.ENV_VAR2) vars.push(process.env.ENV_VAR2)

console.log("Discovered environment variables: " + vars)

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log('Received request for path: ' + req.path)
    res.render('index', { hostname: hostname, version: version, vars: vars})
})

app.get('/version', function (req, res) {
    console.log('Received request for path: ' + req.path)
    res.send(version)
})

app.get('/hostname', function (req, res) {
    console.log('Received request for path: ' + req.path)
    res.send(hostname)
})

app.listen(APP_PORT)

console.log('Starting ' + process.env.npm_package_name + ' v. ' + version)
console.log('Web Server started on host: ' + hostname + ', port: ' + APP_PORT);
