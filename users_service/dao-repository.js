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

    saveUser(user) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO directory (name, email, phone_number) VALUES (?, ?, ?)";
            var inserts = [user.name, user.email, user.phone_number];
            sql = mysql.format(sql, inserts);
            this.connection.query(
                sql, [user], (err, results) => {
                    if (err) {
                        return reject(new Error("An error occured saving the user: " + err));
                    }
                    resolve(results);
                });
        });
    }

    getLastUserId() {
        return new Promise((resolve, reject) => {
            var sql = "SELECT user_id FROM directory ORDER BY user_id DESC LIMIT 1";
            this.connection.query(sql, (err, results) => {
                if (err) {
                    return reject(new Error("An error occured getting the user_id: " + err));
                }
                resolve((results || []).map((user) => {
                    return {
                        user_id: user.user_id,
                    };
                }));
            });
        });
    }

    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            var sql = "DELETE from directory WHERE user_id = ?";
            var inserts = [userId];
            sql = mysql.format(sql, inserts);
            this.connection.query(sql, (err, results) => {
                if (err) {
                    return reject(new Error("An error occured deleting the user: " + err));
                }
                resolve(results);
            });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT user_id, name, email, phone_number FROM directory', (err, results) => {
                if (err) {
                    return reject(new Error("An error occured getting the users: " + err));
                }
                resolve((results || []).map((user) => {
                    return {
                        user_id: user.user_id,
                        name: user.name,
                        email: user.email,
                        phone_number: user.phone_number
                    };
                }));
            });
        });
    }

    getUserById(user_id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT user_id, email, phone_number FROM directory WHERE user_id = ?', [user_id], (err, results) => {
                if (err) {
                    return reject(new Error("An error occured getting the user: " + err));
                }
                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        user_id: results[0].user_id,
                        email: results[0].email,
                        phone_number: results[0].phone_number
                    });
                }
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