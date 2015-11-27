angular.module('mBoard.topics', [
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('topics', {
                url: '/topics',
                controller: 'TopicsCtrl',
                templateUrl: 'app/core/topics/templates/topics.tpl.html'
            });
    });