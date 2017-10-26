/* File: meetings.js
 *
 * Author: Thormod
 * Description: Defines the users API structure
 */
'use strict';

module.exports = (app, options) => {
    app.get('/meetings', (req, res, next) => {
        options.repository.getMeetings().then((meetings) => {
            res.status(200).send(meetings.map((meeting) => {
                return {
                    name: meeting.name,
                    date: meeting.date
                };
            }));
        }).catch(next);
    });
}