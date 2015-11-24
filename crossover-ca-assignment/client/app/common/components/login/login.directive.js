angular.module('mBoard')
    .directive('login', function () {
        return {
            restrict: 'E',
            scope:{
                showLogin: '=showLogin'
            },
            controller: 'LoginController',
            templateUrl: 'app/common/components/login/templates/login.tpl.html'
        };
    });