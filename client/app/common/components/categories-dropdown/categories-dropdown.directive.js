angular.module('mBoard')
    .directive('categoriesDropdown', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                onCategorySelect: '&',
                showDefault: '=',
                category: '='
            },
            controller: 'CategoriesDropdownCtrl',
            templateUrl: 'app/common/components/categories-dropdown/templates/categories-dropdown.tpl.html'
        };
    });