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

    app.delete('/grades/:grade_id', (req, res) => {
        var grade_id = req.param("grade_id");
        options.repository.deleteGrade(grade_id).then(() => res.sendStatus(200));
    });

    app.post('/grades/', (req, res) => {
        var qualifier_id = req.body.qualifier_id;
        var qualified_id = req.body.qualified_id;
        var assistance_id = req.body.assistance_id;
        var score = req.body.score;
        var comment = req.body.comment;
        var grades = { qualifier_id: qualifier_id, qualified_id: qualified_id, assistance_id: assistance_id, score: score, comment: comment };
        options.repository.saveGrade(grades).then(() => res.sendStatus(200));
    });

    app.get('/grades/:grade_id', (req, res, next) => {
        var grade_id = req.param("grade_id");
        options.repository.getGradeById(grade_id).then((grade) => {
            if (!grade) {
                res.status(404).send('Grade not found.');
            } else {
                res.status(200).send({
                    grade_id: grade.grade_id,
                    qualifier_id: grade.meeting_id,
                    qualified_id: grade.user_id,
                    assistance_id: grade.assistance_id,
                    score: grade.score,
                    comment: grade.comment
                });
            }
        }).catch(next);
    });
}