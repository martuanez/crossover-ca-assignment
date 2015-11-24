angular.module('mBoard')
    .controller('SignupModalCtrl', function ($scope, $modalInstance, AuthenticationSvc) {
        $scope.username = '';
        $scope.email = '';
        $scope.password = '';
        //Scope methods
        $scope.onCloseModalClick = closeModal;
        $scope.onSignupClick = signup;

        function closeModal(){
            $modalInstance.dismiss('cancel');
        }

        function signup(){
            $modalInstance.close($scope.username, $scope.password);
        }
    });