/* File: index.js
 *
 * Author: Thormod
 * Description: Entrypoint to the application. API-Gateway
 */

// Required modules
var server = require('./server');
var config = require('./config/config');

console.log('<<  Connecting to API Gateway  >>');

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
    console.error('Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise) {
    console.error('Unhandled Rejection', err);
});

console.log("Connected. Starting server...");
return server.start({
    port: config.port,
}).then((app) => {
    console.log("Server started successfully, running on port " + config.port + ".");
    app.on('close', () => {
        repository.disconnect();
    });
});