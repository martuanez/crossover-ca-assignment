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
                url: '/:id/:urlTitle',
                controller: 'TopicViewCtrl',
                templateUrl: 'app/core/topic/templates/topic-view.tpl.html',
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
                url: '/edit/:id/:urlTitle',
                controller: 'TopicCtrl',
                templateUrl: 'app/core/topic/templates/topic.tpl.html',
                resolve: {
                    topic: function ($stateParams, TopicsSvc) {
                        return TopicsSvc.getTopic($stateParams.id).then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            });
    });