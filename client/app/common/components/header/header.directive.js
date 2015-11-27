angular.module('mBoard')
    .directive('mbHeader', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: 'HeaderCtrl',
            templateUrl: 'app/common/components/header/templates/header.tpl.html'
        };
    });