angular.module('mBoard.topic', [
    'ui.bootstrap'
])
    .config(function config($stateProvider, PostsSvc) {
        $stateProvider
            .state('topic.edit', {
                url: '/t/:title',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: function ($stateParams) {
                        return PostsSvc.getPost($stateParams.id).then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            })
            .state('topic.new', {
                url: '/t/new-topic',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: angular.noop
                }
            });
    });