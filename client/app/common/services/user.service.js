angular.module('mBoard')
    .factory('UserSvc', function ($http) {

        function verifyEmail(email) {
            //todo: create "verify email" endpoint
            return $http.get('api/verify-email/' + encodeURIComponent(email));
        }

        return {
            verifyEmail: verifyEmail
        };
    });
