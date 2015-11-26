angular.module('mBoard')
    .controller('CategoriesDropdownCtrl', function ($scope, CategoriesSvc) {
        $scope.categories = null;
        $scope.defaultCategory = {name: 'All categories'};
        $scope.selectedCategory = '';
        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;

        function setCategories(categories) {
            $scope.categories = [$scope.defaultCategory];
            $scope.categories = $scope.categories.concat(categories.data);
            setCurrentCategory($scope.categories[0]);
        }

        function setCurrentCategory(category) {
            $scope.selectedCategory = category;
            $scope.onCategorySelect(category);
        }

        function init() {
            CategoriesSvc.getCategories().success(setCategories);
        }

        init();
    });