var router = require('express').Router();
var topicsModel = require('../models/topics.model');
var categoriesModel = require('../models/categories.model');

router.route('/topics')
    .get(function (req, res) {
        var categoryId = req.query.categoryId;
        var skip = req.query.skip;

        topicsModel.getTopics(categoryId, skip)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .post(function (req, res) {
        var newTopic = req.body;
        var token = getToken(req);

        categoriesModel.getCategory(newTopic.categoryId)
            .then(function (category) {
                if(!category){
                    onError(res, 'Invalid category');
                }
                return topicsModel.postTopic(newTopic.title, newTopic.body, newTopic.user, category)
            })
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

router.route('/topics/:topicId')
    .get(function (req, res) {
        var topicId = req.param.topicId;
        var token = getToken(req);

        topicsModel.getTopic(topicId)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .put(function (req, res) {
        var newTopic = req.body;
        var topicId = req.param.topicId;
        var token = getToken(req);

        topicsModel.getTopic(topicId)
            .then(function (topicResponse) {
                //todo: Check is the same author here...
                return topicsModel.postTopic(topicId, newTopic.title, newTopic.body, newTopic.user, newTopic.category)
            })
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .delete(function (req, res) {
        var topicId = req.param.topicId;
        var token = getToken(req);

        topicsModel.deleteTopic(topicId)
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

module.exports = router;