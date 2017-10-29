/* File: server.js
 *
 * Author: Thormod
 */

// Required modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports.start = (options) => {
    return new Promise((resolve, reject) => {
        if (!options.repository) throw new Error("A server must be started with a connected repository.");
        if (!options.port) throw new Error("A server must be started with a port.");

        //  Create the app and start logging.
        var app = express();
        app.use(morgan('dev'));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        //  Add the APIs to the app.
        require('./api/assistance')(app, options);

        //  Start the app, creating a running server which we return.
        var server = app.listen(options.port, () => {
            resolve(server);
        });

    });
}