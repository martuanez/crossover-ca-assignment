var router = require('express').Router();
var threadsModel = require('../models/threads.model');

router.route('/threads')
    .get(function (req, res) {
        var categoryId = req.query.category;
        var skip = req.query.skip;

        threadsModel.getThreads(categoryId, skip)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .post(function (req, res) {
        var newThread = req.body;
        var token = getToken(req);

        threadsModel.postThread(newThread.title, newThread.body, newThread.user, newThread.category)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

router.route('/threads/:threadId')
    .get(function (req, res) {
        var threadId = req.param.threadId;
        var token = getToken(req);

        threadsModel.getThread(threadId)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .put(function (req, res) {
        var newThread = req.body;
        var threadId = req.param.threadId;
        var token = getToken(req);

        threadsModel.getThread(threadId)
            .then(function (threadResponse) {
                //todo: Check is the same author here...
                return threadsModel.postThread(threadId, newThread.title, newThread.body, newThread.user, newThread.category)
            })
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .delete(function (req, res) {
        var threadId = req.param.threadId;
        var token = getToken(req);

        threadsModel.deleteThread(threadId)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

function getToken(req) {
    var bearerToken = req.headers.authorization;
    if (bearerToken) {
        return bearerToken.split(' ')[1];
    }
}

function onError(res, error) {
    res.status(500);
    res.json({error: error});
}
