angular.module('mBoard.latest', [
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('latest', {
                url: '/latest',
                templateUrl: 'app/core/latest/templates/latest.tpl.html'
            });
    });