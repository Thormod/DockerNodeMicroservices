/* File: users.js
 *
 * Author: Thormod
 * Description: Defines the users API structure
 */
'use strict';

module.exports = (app, options) => {
    app.get('/users', (req, res, next) => {
        options.repository.getUsers().then((users) => {
            res.status(200).send(users.map((user) => {
                return {
                    email: user.email,
                    phoneNumber: user.phone_number
                };
            }));
        }).catch(next);
    });

    app.post('/users/', (req, res) => {
        var name = req.body.name;
        var phone_number = req.body.phone_number;
        var user = { name: name, phone_number: phone_number };
        options.repository.saveUser(user).then(() => res.status(200));
    });

    app.get('/search', (req, res) => {
        //  Get the email.
        var email = req.query.email;
        if (!email) {
            throw new Error("When searching for a user, the email must be specified, e.g: '/search?email=homer@thesimpsons.com'.");
        }
        //  Get the user from the repo.
        options.repository.getUserByEmail(email).then((user) => {
            if (!user) {
                res.status(404).send('User not found.');
            } else {
                res.status(200).send({
                    email: user.email,
                    phoneNumber: user.phone_number
                });
            }
        }).catch(next);
    });
}