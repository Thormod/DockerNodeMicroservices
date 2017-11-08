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
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phone_number
                };
            }));
        }).catch(next);
    });

    app.post('/users/', (req, res) => {
        var email = req.body.email;
        var name = req.body.name;
        var phone_number = req.body.phone_number;
        var user = { email: email, name: name, phone_number: phone_number };
        options.repository.saveUser(user).then(() => res.sendStatus(200));
    });

    app.delete('/users/:user_id', (req, res) => {
        var user_id = req.param("user_id");
        options.repository.deleteUser(user_id).then(() => res.sendStatus(200));
    });

    app.get('/users/:user_id', (req, res, next) => {
        var user_id = req.param("user_id");
        if (user_id === 'last') {
            options.repository.getLastUserId().then((user) => {
                if (!user) {
                    res.status(404).send('User not found.');
                } else {
                    res.status(200).send({
                        user_id: user.user_id,
                    });
                }
            }).catch(next);
        } else {
            options.repository.getUserById(user_id).then((user) => {
                if (!user) {
                    res.status(404).send('User not found.');
                } else {
                    res.status(200).send({
                        user_id: user.user_id,
                        email: user.email,
                        phoneNumber: user.phone_number
                    });
                }
            }).catch(next);
        }
    });

    app.get('/users/search', (req, res, next) => {
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