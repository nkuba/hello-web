const express = require('express');
const http = require('http');
const os = require('os');
const mongodb = require('mongodb').MongoClient

const app = express();

const APP_PORT = 3080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';

const HOSTNAME = os.hostname();
const VERSION = process.env.npm_package_version

// Add timestamp to log output
require('console-stamp')(console, '[HH:MM:ss.l]');

// Discover Environment Variables
var vars = []
if (process.env.ENV_VAR1) vars.push(process.env.ENV_VAR1)
if (process.env.ENV_VAR2) vars.push(process.env.ENV_VAR2)

console.log("Discovered environment variables: " + vars)

// Web page configuration
app.set('view engine', 'ejs')
app.use(express.static('public'));

// DB Status
function isDbConnected(callback) {
    var dbStatus;
    console.log("Check connection to MongoDB: " + MONGO_URL)
    mongodb.connect(MONGO_URL, (err, db) => {
        if (err) {
            dbStatus = false;
            console.warn("Connection to MongoDB failed: " + err.message)
        } else {
            dbStatus = true;
            db.close();
        }
        callback(dbStatus);
    });
}

app.listen(APP_PORT)

console.log('Starting ' + process.env.npm_package_name + ' v. ' + VERSION)
console.log('Web Server started on host: ' + HOSTNAME + ', port: ' + APP_PORT);

// Resources
app.get('/', function (req, res) {
    console.log('Received request for path: ' + req.path)
    isDbConnected(dbStatus => {
        res.render('index', { hostname: HOSTNAME, version: VERSION, vars: vars, db: { status: dbStatus } })
    })
})

app.get('/version', function (req, res) {
    console.log('Received request for path: ' + req.path)
    res.send(VERSION)
})

app.get('/hostname', function (req, res) {
    console.log('Received request for path: ' + req.path)
    res.send(HOSTNAME)
})