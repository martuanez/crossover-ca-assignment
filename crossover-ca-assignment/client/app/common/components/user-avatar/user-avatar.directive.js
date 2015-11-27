angular.module('mBoard')
    .directive('userAvatar', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                user: '=',
                size: '@'
            },
            controller: 'UserAvatarCtrl',
            templateUrl: 'app/common/components/user-avatar/templates/user-avatar.tpl.html'
        };
    });