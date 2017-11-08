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
}