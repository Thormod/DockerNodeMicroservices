/* File: grades.js
 *
 * Author: Thormod
 * Description: Defines the users API structure
 */
'use strict';

module.exports = (app, options) => {
    app.get('/grades', (req, res, next) => {
        options.repository.getGrades().then((grades) => {
            res.status(200).send(grades.map((grade) => {
                return {
                    grade_id: grade.grade_id,
                    qualifier_id: grade.qualifier_id,
                    qualified_id: grade.qualified_id,
                    assistance_id: grade.assistance_id,
                    score: grade.score,
                    comment: grade.comment
                };
            }));
        }).catch(next);
    });

    app.post('/grades/', (req, res) => {
        var qualifier_id = req.body.qualifier_id;
        var qualified_id = req.body.qualified_id;
        var assistance_id = req.body.assistance_id;
        var score = req.body.score;
        var comment = req.body.comment;
        var grades = { qualifier_id: qualifier_id, qualified_id: qualified_id, assistance_id: assistance_id, score: score, comment: comment };
        options.repository.saveGrades(grades).then(() => res.status(200));
    });
}