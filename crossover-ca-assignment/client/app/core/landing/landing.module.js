angular.module('mBoard.landing', [
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('landing', {
                url: '/',
                template: '<div class="landing"><ui-view/></div>'
            });
    });