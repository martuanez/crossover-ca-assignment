var router = require('express').Router();
var categoriesModel = require('../models/categories.model');

router.route('/categories')
    .get(function (req, res) {
        categoriesModel.getCategories()
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .post(function (req, res) {
        var categoryName = req.body.categoryName;

        categoriesModel.postCategory(categoryName)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    });

router.route('/categories/:categoryId')
    .get(function (req, res) {
        var categoryId = req.param.categoryId;

        categoriesModel.getCategory(categoryId)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .put(function (req, res) {
        var categoryId = req.param.categoryId;
        var categoryName = req.body.name;

        categoriesModel.putCategory(categoryId, categoryName)
            .then(function (response) {
                res.json({data: response});
            }, function (error) {
                onError(res, error);
            });
    })
    .delete(function (req, res) {
        var categoryId = req.param.categoryId;

        categoriesModel.deleteCategory(categoryId)
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
