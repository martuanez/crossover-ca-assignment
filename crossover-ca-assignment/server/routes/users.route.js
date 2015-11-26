var router = require('express').Router();
var usersModel = require('../models/users.model');

router.route('/users')
    .post(function (req, res) {
        var username = req.body.username;
        var email = username;
        var password = req.body.password;

        usersModel.signup(username, password, email)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                res.status(500);
                res.json({error: error});
            });
    });

module.exports = router;