/* File: dao-repository.js
 *
 * Author: Thormod
 * Description: This file exposes a single function called - 'connect' - wich returns
 * a connected repository. Also is the way to access information of all databases 
 * just providing the host, user, password and port information
 */

'use strict';

// Required modules
var mysql = require('mysql');
var database_conf = require('./database/database-conf')

/*
 * 'Repository': This class holds an open connection to a database
 * and exposes some functions to accessing data.
 */
class Repository {
    constructor(connection) {
        this.connection = connection;
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT email, phone_number FROM ' +
                database_conf.users_database.table, (err, results) => {
                    if (err) {
                        return reject(new Error("An error occured getting the users: " + err));
                    }
                    resolve((results || []).map((user) => {
                        return {
                            email: user.email,
                            phone_number: user.phone_number
                        };
                    }));
                });
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            //  Fetch the customer.
            this.connection.query('SELECT email, phone_number FROM directory WHERE email = ?', [email], (err, results) => {
                if (err) {
                    return reject(new Error("An error occured getting the user: " + err));
                }
                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        email: results[0].email,
                        phone_number: results[0].phone_number
                    });
                }
            });
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports.connect = (connectionSettings) => {
    return new Promise((resolve, reject) => {
        if (!connectionSettings.host) throw new Error("A host must be specified.");
        if (!connectionSettings.user) throw new Error("A user must be specified.");
        if (!connectionSettings.password) throw new Error("A password must be specified.");
        if (!connectionSettings.port) throw new Error("A port must be specified.");

        resolve(new Repository(mysql.createConnection(connectionSettings)));
    });
};