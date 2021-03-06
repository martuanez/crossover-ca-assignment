angular.module('mBoard')
    .factory('AuthenticationSvc', function ($http) {

        function login(username, password) {
            return Parse.User.logIn(username, password);
        }

        function logout() {
            return Parse.User.logOut();
        }

        function signup(username, password) {
            return $http.post('api/users/', {username: username, password: password});
        }

        function tokenLogin(){
            Parse.User.become("session-token-here").then(function (user) {
                // The current user is now set to user.
            }, function (error) {
                // The token could not be validated.
            });
        }

        function isAuthenticated(){
            return !!getUser();
        }

        function getUser(){
            return Parse.User.current();
        }

        function getToken(){
            var user = getUser();
            return user && user.getSessionToken();
        }

        return {
            login: login,
            logout: logout,
            signup: signup,
            tokenLogin: tokenLogin,
            isAuthenticated: isAuthenticated,
            getUser: getUser,
            getToken: getToken
        };
    });
