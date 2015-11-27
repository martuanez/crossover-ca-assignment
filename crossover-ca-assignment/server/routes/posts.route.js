var router = require('express').Router();
var postsModel = require('../models/posts.model');

router.route('/posts')
    .get(function (req, res) {
        var skip = req.query.skip;
        var topicId = req.query.topic;

        postsModel.getPosts(topicId, skip)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .post(function (req, res) {
        var post = req.body;

        postsModel.postPost(post.title, post.body, post.user, post.topic)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

router.route('/posts/:postId')
    .get(function (req, res) {
        var postId = req.param.postId;

        postsModel.getPost(postId)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .put(function (req, res) {
        var postId = req.param.postId;
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
        var postId = req.param.postId;

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

module.exports = router;