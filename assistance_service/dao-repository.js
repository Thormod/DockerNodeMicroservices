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
var database_conf = require('./config/config')

/*
 * 'Repository': This class holds an open connection to a database
 * and exposes some functions to accessing data.
 */
class Repository {
    constructor(connection) {
        this.connection = connection;
    }

    saveAssistance(assistance) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO assistance (meeting_id, user_id) VALUES (?, ?)";
            var inserts = [assistance.meeting_id, assistance.user_id];
            sql = mysql.format(sql, inserts);
            this.connection.query(
                sql, [assistance], (err, results) => {
                    if (err) {
                        return reject(new Error("An error occured saving the user: " + err));
                    }
                    resolve(results);
                });
        });
    }

    getAssists() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT assistance_id, meeting_id, user_id FROM assistance', (err, results) => {
                if (err) {
                    return reject(new Error("An error occured getting the assistance: " + err));
                }
                resolve((results || []).map((assistance) => {
                    return {
                        assistance_id: assistance.assistance_id,
                        user_id: assistance.meeting_id,
                        meeting_id: assistance.user_id
                    };
                }));
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