var router = require('express').Router();
var topicsModel = require('../models/topics.model');
var categoriesModel = require('../models/categories.model');
var authenticationSvc = require('../services/authentication.service');

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
        var userPointer = null;
        authenticationSvc.getRequestUser(req)
            .then(function (responseUser) {
                if (!responseUser) {
                    onError(res, 'Invalid session');
                }
                userPointer = getUserPointer(responseUser.objectId);
                return categoriesModel.getCategory(newTopic.categoryId);
            })
            .then(function (category) {
                if (!category) {
                    onError(res, 'Invalid category');
                }
                return topicsModel.postTopic(newTopic.title, newTopic.body, userPointer, category)
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
        var user = null;
        authenticationSvc.getRequestUser(req)
            .then(function (responseUser) {
                if (!responseUser) {
                    onError(res, 'Invalid session');
                }
                user = responseUser;
                return topicsModel.getTopic(topicId);
            })
            .then(function (topicResponse) {
                debugger;
                if(user.objectId !== topicResponse.creator.objectId){
                    onError(res, 'This user is not authorized to update this topic');
                }
                return topicsModel.putTopic(topicId,
                    newTopic.title,
                    newTopic.body,
                    newTopic.categoryId,
                    newTopic.postsCount,
                    newTopic.lastCommentUser,
                    newTopic.views,
                    newTopic.replies)
            })
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .delete(function (req, res) {
        var topicId = req.param.topicId;
        var user = null;
        authenticationSvc.getRequestUser(req)
            .then(function (responseUser) {
                if (!responseUser) {
                    onError(res, 'Invalid session');
                }
                user = responseUser;
                return topicsModel.getTopic(topicId);
            })
            .then(function (topic) {
                if (!topic) {
                    onError(res, 'Invalid session');
                }
                return topicsModel.deleteTopic(topicId);
            })
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

function onError(res, error) {
    res.status(500);
    res.json({error: error});
}

function getUserPointer(objectId){
    return {
        "__type": "Pointer",
        "className": "_User",
        "objectId": objectId
    };
}

module.exports = router;