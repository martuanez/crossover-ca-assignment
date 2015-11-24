var router = require('express').Router();
var usersModel = require('../models/users.model');

router.route('/users')
    .post(function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;

        usersModel.signup(username, password, email)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

module.exports = router;