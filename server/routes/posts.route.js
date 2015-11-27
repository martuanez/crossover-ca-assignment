var router = require('express').Router();
var postsModel = require('../models/posts.model');
var topicsModel = require('../models/topics.model');
var authenticationSvc = require('../services/authentication.service');

router.route('/posts')
    .get(function (req, res) {
        var skip = req.query.skip;
        var topicId = req.query.topicId;

        postsModel.getPosts(topicId, skip)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .post(function (req, res) {
        var post = req.body;
        var userPointer = null;
        var user = null;
        var createdPost = null;
        authenticationSvc.getRequestUser(req)
            .then(function (responseUser) {
                if (!responseUser) {
                    onError(res, 'Invalid session');
                }
                userPointer = getUserPointer(responseUser.objectId);
                var topic = getTopicPointer(post.topicId);

                return postsModel.postPost( post.body, userPointer, topic);
            })
            .then(function (postResponse) {
                createdPost = postResponse;
                return topicsModel.updateOnNewPost( userPointer , post.topicId);
            })
            .then(function (topicResponse) {
                //Get the post again so we can retrieve the user and the topic as well
                return postsModel.getPost(createdPost.id);
            })
            .then(function (response) {
                console.log(response);
                global.io.emit('new post', response);
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

router.route('/posts/:postId')
    .get(function (req, res) {
        var postId = req.params.postId;

        postsModel.getPost(postId)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .put(function (req, res) {
        var postId = req.params.postId;
        var post = req.query;

        postsModel.getPost(postId)
            .then(function (postResponse) {
                //todo: Check is the same user here...
                return postsModel.putPost(postId, post.title, post.body, user)
            })
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .delete(function (req, res) {
        var postId = req.params.postId;

        postsModel.deletePost(postId)
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


function getTopicPointer(objectId){
    return {
        "__type": "Pointer",
        "className": "Topics",
        "objectId": objectId
    };
}

function getUserPointer(objectId){
    return {
        "__type": "Pointer",
        "className": "_User",
        "objectId": objectId
    };
}

module.exports = router;