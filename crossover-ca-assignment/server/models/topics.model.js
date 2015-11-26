var Parse = require('../lib/parse/parse');
var categoriesModel = require('../models/categories.model');

function getTopics(categoryId, skip) {
    var Topic = Parse.Object.extend('Topics');
    var query = new Parse.Query(Topic);

    if (categoryId) {
        var categoriesQuery = categoriesModel.getCategoryQuery(categoryId);
        query.matchesQuery('category', categoriesQuery);
    }
    if(skip){
        query.skip(skip);
    }
    query.descending("createdAt");

    return query.find();
}

function getTopicQuery(id) {
    var Topic = Parse.Object.extend('Topics');
    var query= new Parse.Query(Topic);

    query.equalTo('objectId', id);

    return query;
}

function getTopic(id) {
    var query = getTopicQuery(id);
        query.include('user');
    return query.first();
}

function postTopic(title, body, user, category) {
    var Topic = Parse.Object.extend("Topics");
    var topic = new Topic();

    topic.set('title', title);
    topic.set('body', body);
    topic.set('creator', user);
    topic.set('category', category);
    topic.set('postsCount', 1);

    return topic.save();
}

function putTopic(id, title, body, category, postsCount, lastCommentUser, views, replies) {
    return getTopic(id).then(function(topic){
        topic.set('title', title);
        topic.set('body', body);
        topic.set('category', category);
        topic.set('postsCount', postsCount);
        topic.set('lastCommentUser', lastCommentUser);
        topic.set('views', views);
        topic.set('replies', replies);

        return topic.save();
    });
}

function deleteTopic(id) {
    getTopic(id)
        .then(function(topic){

        });
}

module.exports = {
    getTopics: getTopics,
    postTopic: postTopic,
    getTopic: getTopic,
    getTopicQuery: getTopicQuery,
    putTopic: putTopic,
    deleteTopic: deleteTopic
};
