const express           = require('express');
const http              = require('http');
const os                = require('os');
const app               = express();

const APP_PORT          = 4080;
const HOSTNAME          = os.hostname();
const APP_VERSION       = process.env.npm_package_version

const REST_HOST         = process.env.REST_HOST     || "localhost"
const REST_PORT         = process.env.REST_PORT     || 3080

function getRestData (callback) {
    var options = {
        host: REST_HOST,
        port: REST_PORT,
        path: "/",
        method: 'GET'
    };

    var data = [];

    http.request(options, function (res) {
        console.log('Sending request with options: ' + JSON.stringify(options));
        
        let rawData = '';

        res.on('data', (chunk) => { rawData += chunk; });

        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                data = parsedData;
                console.log('Received data:');
            } catch (e) {
                console.error(e.message);
            }
            callback(data);
        });
    }).on('error', function(e) {
        console.warn("Error on HTTP call;", e.message)
        callback(data);
    }).end();
}

// Add timestamp to log output
require('console-stamp')(console, '[HH:MM:ss.l]');

// Web page configuration
app.set('view engine', 'ejs')
app.use(express.static('public'));

// Resources
app.get('/', function (req, res) {
    console.log('Received request for path: ' + req.path)
    getRestData((data) => { 
        res.render('index', { web_data: {hostname: HOSTNAME, version: APP_VERSION}, rest_data: data }) })
})

app.listen(APP_PORT)

console.log('Starting ' + process.env.npm_package_name + ' v. ' + APP_VERSION)
console.log('Web Server started on host: ' + HOSTNAME + ', port: ' + APP_PORT);
