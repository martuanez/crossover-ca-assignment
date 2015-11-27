angular.module('mBoard')
    .factory('UtilsSvc', function () {
        function getUrlTitle(title) {
            title = title.toLowerCase();
            return title.split(' ').join('-');
        }

        function getFormattedDate(date) {
            return moment(date).fromNow(true);
        }

        return {
            getUrlTitle: getUrlTitle,
            getFormattedDate: getFormattedDate
        };
    });
