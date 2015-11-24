angular.module('mBoard')
    .directive('mbFooter', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/components/footer/templates/footer.tpl.html'
        };
    });