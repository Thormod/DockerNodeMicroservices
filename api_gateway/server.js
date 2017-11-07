/* File: server.js
 *
 * Author: Thormod
 */

// Required modules
var express = require('express');
var morgan = require('morgan');

module.exports.start = (options) => {
    return new Promise((resolve, reject) => {
        if (!options.port) throw new Error("A server must be started with a port.");

        //  Create the app and start logging.
        var app = express();
        app.use(morgan('dev'));
        // Add headers
        app.use(function(req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
        //  Add the APIs to the app.
        require('./api/gateway')(app, options);

        //  Start the app, creating a running server which we return.
        var server = app.listen(options.port, () => {
            resolve(server);
        });

    });
}