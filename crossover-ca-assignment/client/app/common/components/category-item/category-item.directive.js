angular.module('mBoard')
    .directive('categoryItem', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                category: '='
            },
            controller: 'CategoryItemCtrl',
            templateUrl: 'app/common/components/category-item/templates/category-item.tpl.html'
        };
    });