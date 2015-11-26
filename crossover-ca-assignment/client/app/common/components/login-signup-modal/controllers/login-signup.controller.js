angular.module('mBoard')
    .controller('LoginSignupModalCtrl', function ($scope, $uibModalInstance, toastr, AuthenticationSvc, UserSvc, showLogin) {
        //todo: test login, signup & forgot password funcionality
        $scope.isLoading = false;
        $scope.requiredMsg = 'This field is required';
        $scope.loginUser = {email: '', password: ''};
        $scope.signupUser = {email: '', password: '', passwordConfirm: ''};
        $scope.isLoading = false;
        $scope.showLogin = false;
        //Scope methods
        $scope.onSignupTabClick = onSignupTabClick;
        $scope.onLoginTabClick = onLoginTabClick;

        //Signup methods
        $scope.onCloseModalClick = closeModal;
        $scope.onSignupBtnClick = signup;
        $scope.verifyEmail = verifyEmail;
        //Login methods
        $scope.onLoginClick = onLoginClick;
        $scope.onForgotPasswordClick = onForgotPasswordClick;

        function onSignupTabClick(){
            $scope.showLogin = false;
        }

        function onLoginTabClick(){
            $scope.showLogin = true;
        }

        //Login methods
        function onForgotPasswordClick() {
            if ($scope.loginUser.email) {
                getUserByEmail().then(function (response) {
                    if (response) {
                        Parse.User.requestPasswordReset($scope.loginUser.email, {
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

            usersQuery.equalTo('username', $scope.loginUser.email.toLowerCase());
            usersQuery.limit(1000);

            return usersQuery.first();
        }

        function onLoginClick() {
            var sessionToken;

            if (!$scope.loginForm.$valid) {
                forceFormValidation();
            } else {
                $scope.isLoading = true;
                AuthenticationSvc.login($scope.loginUser.email.toLowerCase(), $scope.loginUser.password)
                    .then(function (response) {
                        $scope.isLoading = false;
                        $uibModalInstance.close();
                    }, function (response) {
                        $scope.isLoading = false;
                        toastr.error('Unable to login, please make sure the credentials are correct.');
                    });
            }
        }

        function verifyEmail() {
            if ($scope.signupForm.email.$valid) {
                UserSvc.verifyEmail($scope.user.email).success(onEmailValidateSuccess);
            }
        }

        function onEmailValidateSuccess(response) {
            $scope.isEmailValid = response.data.isEmailValid;
            if (!$scope.isEmailValid) {
                toastr.error('Email is already in use');
            }
        }

        //Signup methods

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }

        function signup() {
            if (!$scope.signupForm.$valid) {
                forceFormValidation();
            } else {
                $scope.isLoading = true;
                AuthenticationSvc.signup($scope.signupUser.email, $scope.signupUser.password)
                    .success(function (response) {
                        var token = response.data.sessionToken;
                        $scope.isLoading = false;
                        loginWithToken(token);
                    })
                    .error(function (response) {
                        toastr.error(response.error);
                        $scope.isLoading = false;
                    }
                );
            }
        }

        function loginWithToken(token) {
            AuthenticationSvc.tokenLogin(token)
                .then(function () {
                    $uibModalInstance.close();
                });
        }

        //Common
        function forceFormValidation() {
            Object.keys($scope.signupForm).forEach(function (key) {
                if (key.indexOf('$') === -1 && $scope.signupForm[key].$setTouched) {
                    $scope.signupForm[key].$setTouched();
                }
            });
        }

        function init(){
            $scope.showLogin = showLogin;
        }

        init();
    });