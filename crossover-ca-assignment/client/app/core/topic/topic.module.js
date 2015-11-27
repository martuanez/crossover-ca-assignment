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
            .state('topic.view', {
                url: '/{urlTitle}',
                controller: 'TopicViewCtrl',
                templateUrl: 'app/core/topic-view/templates/topic-view.tpl.html',
                resolve: {
                    topic: function ($stateParams, TopicsSvc) {
                        return TopicsSvc.getTopic($stateParams.id).then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            })
            .state('topic.new', {
                url: '/create',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: angular.noop
                }
            })
            .state('topic.edit', {
                url: '/edit/{urlTitle}',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: function ($stateParams, PostsSvc) {
                        return PostsSvc.getPost($stateParams.id).then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            });
    });