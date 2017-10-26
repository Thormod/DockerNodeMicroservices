/* File: users.js
 *
 * Author: Thormod
 * Description: Simple app configuration
 */

module.exports = {
    port: process.env.PORT || 8123,
    db: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        database: 'users',
        table: 'directory',
        user: 'users_service',
        password: '123',
        port: 3306,
        waitForConnection: true
    }
};