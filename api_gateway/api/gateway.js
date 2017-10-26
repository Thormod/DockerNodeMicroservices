/* File: gateway.js
 *
 * Author: Thormod
 * Description: Defines the API Gateway structure
 */
'use strict';

//Required modules
var httpProxy = require('http-proxy');
var apiProxy = new httpProxy.createProxyServer();
var serverOne = 'http://192.168.99.100:8123',
    ServerTwo = 'http://192.168.99.100:8124';

module.exports = (app, options) => {
    app.all("/users/*", function(req, res) {
        console.log('redirecting to Server1');
        apiProxy.web(req, res, { target: serverOne });
    });

    app.all("/meetings/*", function(req, res) {
        console.log('redirecting to Server2');
        apiProxy.web(req, res, { target: ServerTwo });
    });
}