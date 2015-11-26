angular.module('mBoard')
    .directive('categoriesDropdown', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                onCategorySelect: '&',
                showDefault: '='
            },
            controller: 'CategoriesDropdownCtrl',
            templateUrl: 'app/common/components/categories-dropdown/templates/categories-dropdown.tpl.html'
        };
    });