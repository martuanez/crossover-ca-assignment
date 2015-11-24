angular.module('mBoard')
    .controller('HeaderCtrl', function ($scope, $modal, AuthenticationSvc) {
        $scope.showChilds = false;
        //Scope methods
        $scope.onLoginClick = onLoginClick;
        $scope.onLogoutClick = onLogoutClick;
        $scope.onSignupClick = onSignupClick;
        //$scope.loggedIn = AuthenticationSvc.isAuthorized();

        function onLoginClick(){
            $scope.showLogin = !$scope.showLogin;
        }

        function onLogoutClick(){
            AuthSvc.deAuthorize();
          //  $scope.loggedIn = AuthSvc.isAuthorized();
        }

        function onSignupClick(){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'app/common/components/signup-modal/templates/signup-modal.tpl.html',
                controller: 'SignupModalCtrl',
                size: 'lg',
                resolve: {
                    survey: getValue($scope.survey),
                    question: getValue(question)
                }
            });

            modalInstance.result.then(function (editedQuestion) {
                SurveysService.updateSurvey($scope.survey);
            }, function () {
                //Do something on cancel if applies
            });
        }
    });