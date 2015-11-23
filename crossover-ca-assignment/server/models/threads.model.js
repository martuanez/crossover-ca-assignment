var Parse = require('../lib/parse/parse');
var categoriesModel = require('categories.model');

function getThreads(categoryId, skip) {
    var Thread = Parse.Object.extend('Threads');
    var query = new Parse.Query(Thread);

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

function getThreadQuery(id) {
    var Thread = Parse.Object.extend('Threads');
    var query= new Parse.Query(Thread);

    query.equalTo('objectId', id);

    return query;
}

function getThread(id) {
    var query = getThreadQuery(id);
        query.include('user');
    return query.first();
}

function postThread(title, body, user, category) {
    var Thread = Parse.Object.extend("Threads");
    var thread = new Thread();

    thread.set('title', title);
    thread.set('body', body);
    thread.set('user', user);
    thread.set('category', category);
    thread.set('postsCount', 1);

    return thread.save();
}

function putThread(id, title, body, user, category, postsCount) {
    var Thread = Parse.Object.extend("Threads");
    var thread = new Thread();

    thread.set('objectId', id);
    thread.set('title', title);
    thread.set('body', body);
    thread.set('user', user);
    thread.set('category', category);
    thread.set('postsCount', postsCount);

    return thread.save();
}

function deleteThread(id) {
    var Thread = Parse.Object.extend('Threads');
    var thread = new Thread();
    thread.set('objectId', id);

    return thread.destroy();
}

module.export = {
    getThreads: getThreads,
    postThread: postThread,
    getThread: getThread,
    getThreadQuery: getThreadQuery,
    putThread: putThread,
    deleteThread: deleteThread
};
