/* File: config.js
 *
 * Author: Thormod
 * Description: Simple app configuration
 */

module.exports = {
    port: process.env.PORT || 8126,
    db: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        database: 'grades',
        table: 'grades',
        user: 'grades_service',
        password: '123',
        port: 3306,
        waitForConnection: true
    }
};