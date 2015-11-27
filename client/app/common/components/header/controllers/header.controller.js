angular.module('mBoard')
    .controller('HeaderCtrl', function ($scope, $uibModal, AuthenticationSvc) {
        $scope.showChilds = false;
        $scope.isLoggedIn = AuthenticationSvc.isAuthenticated();
        //Scope methods
        $scope.onLoginClick = onLoginClick;
        $scope.onLogoutClick = onLogoutClick;
        $scope.onSignupClick = onSignupClick;
        $scope.onUserLogin = updateLoggedInStatus;

        function updateLoggedInStatus() {
            $scope.isLoggedIn = AuthenticationSvc.isAuthenticated();
            $scope.showLogin = false;
        }

        function onLoginClick() {
            openSignupLoginModal(true);
        }

        function onLogoutClick() {
            AuthenticationSvc.logout();
            updateLoggedInStatus();
        }

        function onSignupClick() {
            openSignupLoginModal();
        }

        function openSignupLoginModal(isLogin) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/common/components/login-signup-modal/templates/login-signup-modal.tpl.html',
                controller: 'LoginSignupModalCtrl',
                size: 'md',
                resolve: {
                    showLogin: function showLogin() {
                        return isLogin;
                    }
                }
            });

            modalInstance.result.then(function () {
                updateLoggedInStatus();
            });
        }
    });