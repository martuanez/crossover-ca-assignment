angular.module('mBoard.categories', [
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('categories', {
                url: '/categories',
                templateUrl: 'app/core/categories/templates/categories.tpl.html'
            });
    });