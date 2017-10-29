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

    saveGrade(grades) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO grades (qualifier_id, qualified_id, assistance_id, score, comment) VALUES (?, ?, ?, ?, ?)";
            var inserts = [grades.qualifier_id, grades.qualified_id, grades.assistance_id, grades.score, grades.comment];
            sql = mysql.format(sql, inserts);
            this.connection.query(
                sql, [grades], (err, results) => {
                    if (err) {
                        return reject(new Error("An error occured saving the grade: " + err));
                    }
                    resolve(results);
                });
        });
    }

    getGrades() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT qualifier_id, qualified_id, assistance_id, score, comment FROM grades', (err, results) => {
                if (err) {
                    return reject(new Error("An error occured getting the grades: " + err));
                }
                resolve((results || []).map((grades) => {
                    return {
                        qualifier_id: grades.meeting_id,
                        qualified_id: grades.user_id,
                        assistance_id: grades.assistance_id,
                        score: grades.score,
                        comment: grades.comment
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