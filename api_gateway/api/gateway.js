/* File: gateway.js
 *
 * Author: Thormod
 * Description: Defines the API Gateway structure
 */
'use strict';

//Required modules
var httpProxy = require('http-proxy');
var apiProxy = new httpProxy.createProxyServer();
var userServer = 'http://192.168.99.100:8123',
    meeetingsServer = 'http://192.168.99.100:8124',
    assistanceServer = 'http://192.168.99.100:8125',
    gradesServer = 'http://192.168.99.100:8126';

module.exports = (app, options) => {
    app.all("/users/*", function(req, res) {
        console.log('redirecting to userServer');
        apiProxy.web(req, res, { target: userServer });
    });

    app.all("/meetings/*", function(req, res) {
        console.log('redirecting to meeetingsServer');
        apiProxy.web(req, res, { target: meeetingsServer });
    });

    app.all("/assistance/*", function(req, res) {
        console.log('redirecting to assistanceServer');
        apiProxy.web(req, res, { target: assistanceServer });
    });

    app.all("/grades/*", function(req, res) {
        console.log('redirecting to assistanceServer');
        apiProxy.web(req, res, { target: gradesServer });
    });
}