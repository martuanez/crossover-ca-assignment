angular.module('mBoard.thread', [
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('thread', {
                url: '/thread/:id',
                template: '<div class="thread"><ui-view/></div>'
            });
    });