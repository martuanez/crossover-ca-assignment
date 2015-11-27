angular.module('mBoard')
    .factory('UtilsSvc', function () {
        function getUrlTitle(title) {
            title = title.toLowerCase();
            return title.split(' ').join('-');
        }

        return {
            getUrlTitle: getUrlTitle
        };
    });
