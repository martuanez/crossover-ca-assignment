angular.module('mBoard')
    .directive('scrollTo', function () {
        return {
            restrict: 'A',
            scope: {
                scrollTo: '@'
            },
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var elementTop = $('#' + scope.scrollTo).offset().top - 50;
                    $("body,html").animate({scrollTop: elementTop}, "slow");
                });
            }
        };
    });