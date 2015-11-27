angular.module('mBoard')
    .controller('CategoryItemCtrl', function ($scope, AlphabetColorSvc) {
        $scope.colorClass = '';

        function init() {
            if ($scope.category) {
                $scope.colorClass = AlphabetColorSvc.getColorClass($scope.category.name[0]);
            }
        }

        init();
    });