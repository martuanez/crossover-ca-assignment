var Parse = require('../lib/parse/parse');
var Q = require('q');

function getCategories() {
    var categoriesObj = Parse.Object.extend('Categories');
    var query = new Parse.Query(categoriesObj);

    return query.find();
}

function postCategory(name) {
    var Categories = Parse.Object.extend("Categories");
    var category = new Categories();

    category.set('name', name);

    return category.save();
}

function getCategoryQuery(id) {
    var categoriesObj = Parse.Object.extend('Categories');
    var query = new Parse.Query(categoriesObj);

    query.equalTo('objectId', id);

    return query;
}

function getCategory(id) {
    return getCategoryQuery(id).first();
}

function putCategory(id, name) {
    var categoriesObj = Parse.Object.extend('Categories');
    categoriesObj.set('objectId', id);
    categoriesObj.set('name', name);

    return categoriesObj.save();
}

function deleteCategory(id) {
    var categoriesObj = Parse.Object.extend('Categories');
    categoriesObj.set('objectId', id);

    return categoriesObj.destroy();
}

module.exports = {
    getCategories: getCategories,
    postCategory: postCategory,
    getCategory: getCategory,
    getCategoryQuery: getCategoryQuery,
    putCategory: putCategory,
    deleteCategory: deleteCategory
};
