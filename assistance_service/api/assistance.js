/* File: meetings.js
 *
 * Author: Thormod
 * Description: Defines the users API structure
 */
'use strict';

module.exports = (app, options) => {
    app.get('/assistance', (req, res, next) => {
        options.repository.getAssists().then((assists) => {
            res.status(200).send(assists.map((assistance) => {
                return {
                    assistance_id: assistance.assistance_id,
                    user_id: assistance.user_id,
                    meeting_id: assistance.meeting_id
                };
            }));
        }).catch(next);
    });

    app.post('/assistance/', (req, res) => {
        var user_id = req.body.user_id;
        var meeting_id = req.body.meeting_id;
        var assistance = { user_id: user_id, meeting_id: meeting_id };
        options.repository.saveAssistance(assistance).then(() => res.sendStatus(200));
    });

    app.delete('/assistance/:assistance_id', (req, res) => {
        var meeting_id = req.param("assistance_id");
        options.repository.deleteAssistance(assistance_id).then(() => res.sendStatus(200));
    });

    app.get('/assistance/:assistance_id', (req, res, next) => {
        var meeting_id = req.param("assistance_id");
        options.repository.getMeetingById(assistance_id).then((assistance) => {
            if (!assistance) {
                res.status(404).send('Assistance not found.');
            } else {
                res.status(200).send({
                    assistance_id: assistance.assistance_id,
                    meeting_id: assistance.meeting_id,
                    user_id: assistance.user_id
                });
            }
        }).catch(next);
    });
}