angular.module('mBoard')
    .controller('UserAvatarCtrl', function ($scope, AlphabetColorSvc) {
        $scope.colorClass = '';

        function init() {
            if ($scope.user) {
                $scope.colorClass = AlphabetColorSvc.getColorClass($scope.user.username[0]);
            }
        }

        init();
    });