var Parse = require('../lib/parse/parse');
var topicsModel = require('./topics.model');

function getPosts(topicId, skip) {
    var Post = Parse.Object.extend('Posts');
    var query = new Parse.Query(Post);

    var topicQuery = topicsModel.getTopicQuery(topicId);
    query.matchesQuery('topic', topicQuery);

    query.include('user');
    if(skip){
        query.skip(skip);
    }

    query.ascending("createdAt");

    return query.find();
}

function postPost(body, user, topic) {
    var Post = Parse.Object.extend("Posts");
    var post = new Post();

    post.set('body', body);
    post.set('user', user);
    post.set('topic', topic);

    return post.save();
}

function getPost(id) {
    var Post = Parse.Object.extend('Posts');
    var query = new Parse.Query(Post);
    query.include('user');
    query.equalTo('objectId', id);

    return query.first();
}

function putPost(id, title, body, user) {
    var Post = Parse.Object.extend("Posts");
    var post = new Post();

    post.set('objectId', id);
    post.set('title', title);
    post.set('body', body);

    return post.save();
}

function deletePost(id) {
    var Post = Parse.Object.extend('Posts');
    var post = new Post();
    post.set('objectId', id);

    return post.destroy();
}

module.exports = {
    getPosts: getPosts,
    postPost: postPost,
    getPost: getPost,
    putPost: putPost,
    deletePost: deletePost
};
