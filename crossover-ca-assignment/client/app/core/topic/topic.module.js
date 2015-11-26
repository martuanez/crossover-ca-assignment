angular.module('mBoard.topic', [
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('topic', {
                abstract: true,
                url: '/t',
                template: '<div class="topic container section"><ui-view/></div>'
            })
             /*.state('topic.edit', {
                url: '/t/:title',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: function ($stateParams, PostsSvc) {
                        return PostsSvc.getPost($stateParams.id).then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            })*/
            .state('topic.new', {
                url: '/new-topic',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: angular.noop
                }
            });
    });