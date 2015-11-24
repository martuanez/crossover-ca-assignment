angular.module('mBoard')
    .factory('AuthenticationSvc', function ($http) {

        function login(username, password) {
            var deferred = $q.defer();
            Parse.User.logIn(username, password, {
                success: function (user) {
                    deferred.resolve(user);
                },
                error: function (user, error) {
                    deferred.reject(user, error);
                }
            });
            return deferred.promise;
        }

        function logout() {
            return $http.get('api/categories/' + id);
        }

        function signup(username, password, email) {
            return $http.post('api/users/', {username: username, password: password, email: email});
        }

        return {
            login: login,
            logout: logout,
            signup: signup
        };
    });
