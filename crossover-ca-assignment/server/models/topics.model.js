var Parse = require('../lib/parse/parse');
var categoriesModel = require('../models/categories.model');

function getTopics(categoryId, skip) {
    var Topic = Parse.Object.extend('Topics');
    var query = new Parse.Query(Topic);

    query.include('category');
    query.include('creator');
    query.include('lastCommentUser');
    query.limit(1000);

    if (categoryId) {
        var categoriesQuery = categoriesModel.getCategoryQuery(categoryId);
        query.matchesQuery('category', categoriesQuery);
    }
    if (skip) {
        query.skip(skip);
    }
    query.descending("createdAt");

    return query.find();
}

function getTopicQuery(id) {
    var Topic = Parse.Object.extend('Topics');
    var query = new Parse.Query(Topic);

    query.equalTo('objectId', id);

    return query;
}

function getTopic(id) {
    var query = getTopicQuery(id);
    query.include('creator');
    query.include('category');

    return query.first().then(function (topic) {
        topic.increment('views');
        return topic.save();
    });
}

function postTopic(title, body, user, category) {
    var Topic = Parse.Object.extend("Topics");
    var topic = new Topic();

    topic.set('title', title);
    topic.set('body', body);
    topic.set('creator', user);
    topic.set('category', category);
    topic.set('replies', 1);
    topic.set('views', 0);

    return topic.save();
}

function putTopic(id, body, category) {
    return getTopic(id).then(function (topic) {
        topic.set('body', body);
        topic.set('category', category);

        return topic.save();
    });
}

function deleteTopic(id) {
    getTopic(id)
        .then(function (topic) {

        });
}

function updateOnNewPost(user, id) {
    return getTopic(id)
        .then(function (topic) {
            topic.set('lastCommentUser', user);
            topic.increment('replies');
            topic.increment('postsCount');

            return topic.save();
        });
}

module.exports = {
    getTopics: getTopics,
    postTopic: postTopic,
    getTopic: getTopic,
    getTopicQuery: getTopicQuery,
    putTopic: putTopic,
    deleteTopic: deleteTopic,
    updateOnNewPost: updateOnNewPost
};
