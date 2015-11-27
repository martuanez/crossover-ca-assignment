angular.module('mBoard')
    .controller('CategoriesDropdownCtrl', function ($scope, CategoriesSvc) {
        $scope.categories = [];
        $scope.defaultCategory = {name: 'All categories'};
        $scope.selectedCategory = '';
        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;

        function setCategories(categories) {
            $scope.categories = categories.data;
            if ($scope.showDefault) {
                $scope.categories.unshift($scope.defaultCategory);
                setCurrentCategory($scope.categories[0]);
            }
        }

        function setCurrentCategory(category) {
            $scope.selectedCategory = category;
            $scope.category = $scope.selectedCategory;
            $scope.onCategorySelect({category: category});
        }

        function init() {
            CategoriesSvc.getCategories().success(setCategories);
            $scope.selectedCategory = $scope.category;
        }

        init();
    });