/* File: gateway.js
 *
 * Author: Thormod
 * Description: Defines the API Gateway structure
 */
'use strict';

//Required modules
var httpProxy = require('http-proxy');
var apiProxy = new httpProxy.createProxyServer();

// URL you need to change in order to run locally on your pc
var url = 'http://192.168.99.100';
var userServer = url + ':8123',
    meeetingsServer = url + ':8124',
    assistanceServer = url + ':8125',
    gradesServer = url + ':8126';

module.exports = (app, options) => {
    app.get('/', (req, res) => {
        res.send(process.env.URL);
    })

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