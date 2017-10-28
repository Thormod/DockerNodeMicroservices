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
                    date: meeting.date,
                    subject: meeting.subject
                };
            }));
        }).catch(next);
    });

    app.post('/meetings/', (req, res) => {
        var meeting_name = req.body.meeting_name;
        var meeting_date = req.body.meeting_date;
        var meeting_subject = req.body.meeting_subject;
        var meeting = { meeting_name: meeting_name, meeting_date: meeting_date, meeting_subject: meeting_subject };
        options.repository.saveMeeting(meeting).then(() => res.status(200));
    });
}