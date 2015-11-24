angular.module('mBoard')
    .controller('LoginController', function ($scope, AuthenticationSvc, $state, toastr) {
        $scope.isLoading = false;
        $scope.requiredMsg = 'This field is required';
        $scope.username = '';
        $scope.password = '';
        //Scope methods
        $scope.onLogin = onLogin;
        $scope.onForgotPasswordClick = onForgotPasswordClick;

        function onForgotPasswordClick() {
            if ($scope.username) {
                getUserByEmail().then(function (response) {
                    if (response) {
                        Parse.User.requestPasswordReset($scope.username, {
                            success: function () {
                                toastr.success('An email has been sent for resetting the password');
                            },
                            error: function (error) {
                                toastr.error(error.message);
                            }
                        });
                    } else {
                        toastr.error('The given username is not registered');
                    }
                });
            } else {
                $scope.loginForm.username.$setTouched();
                toastr.error('Username is required for resetting the password');
            }
        }

        function getUserByEmail() {
            var TUTUser = Parse.Object.extend('User');
            var usersQuery = new Parse.Query(TUTUser);

            usersQuery.equalTo('username', $scope.username.toLowerCase());
            usersQuery.limit(1000);

            return usersQuery.first();
        }

        function onLogin() {
            var sessionToken;

            if (!$scope.loginForm.$valid) {
                forceFormValidation();
            } else {
                $scope.isLoading = true;
                AuthenticationSvc.login($scope.username.toLowerCase(), $scope.password)
                    .then(function onLoginSuccess(response) {
                        sessionToken = response._sessionToken;
                        AuthService.setToken(sessionToken);
                        return UserService.getCurrent();
                    })
                    .then(function (response) {
                        $scope.isLoading = false;
                        var user = response.data.data;
                        AuthService.setAuthorizedUser(sessionToken, user);
                    }, function (response) {
                        $scope.isLoading = false;
                        toastr.error('Unable to login, please make sure the credentials are correct.');
                    });
            }
        }

        function forceFormValidation() {
            Object.keys($scope.loginForm).forEach(function (key) {
                if (key.indexOf('$') === -1 && $scope.loginForm[key].$setTouched) {
                    $scope.loginForm[key].$setTouched();
                }
            });
        }
    });