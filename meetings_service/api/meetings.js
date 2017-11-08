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
                    meeting_id: meeting.meeting_id,
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
        options.repository.saveMeeting(meeting).then(() => res.sendStatus(200));
    });

    app.delete('/meetings/:meeting_id', (req, res) => {
        var meeting_id = req.param("meeting_id");
        options.repository.deleteMeeting(meeting_id).then(() => res.sendStatus(200));
    });

    app.get('/meetings/:meeting_id', (req, res, next) => {
        var meeting_id = req.param("meeting_id");
        options.repository.getMeetingById(meeting_id).then((meeting) => {
            if (!meeting) {
                res.status(404).send('Meeting not found.');
            } else {
                res.status(200).send({
                    meeting_id: meeting.meeting_id,
                    name: meeting.meeting_name,
                    date: meeting.meeting_date,
                    subject: meeting.meeting_subject
                });
            }
        }).catch(next);
    });
}