var Q = require('q');

function getToken(req) {
    var bearerToken = req.headers.authorization;
    if (bearerToken) {
        return bearerToken.split(' ')[1];
    }
}

function isAuthenticated(req) {
    var token = getToken(req);
    return getUserByToken(token);
}

function getRequestUser(req) {
    var deferred = Q.defer();
    var token = getToken(req);
    ParseRestApi.me(token, function (error, response) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(response);
        }
    });

    return deferred.promise;
}

module.exports = {
    getRequestUser: getRequestUser
};