var Parse = require('../lib/parse/parse');
var threadsModel = require('threads.model');

function getPosts(threadId, skip) {
    var Post = Parse.Object.extend('Posts');
    var query = new Parse.Query(Post);

    var threadQuery = threadsModel.getThreadQuery(threadId);
    query.matchesQuery('thread', threadQuery);
    if(skip){
        query.skip(skip);
    }

    query.ascending("createdAt");

    return query.find();
}

function postPost(title, body, user, thread) {
    var Post = Parse.Object.extend("Posts");
    var post = new Post();

    post.set('title', title);
    post.set('body', body);
    post.set('user', user);
    post.set('thread', thread);

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
