angular.module('mBoard', [
    'ui.router',
    'ui.bootstrap',
    'toastr',
    'textAngular',
    'mBoard.topics',
    'mBoard.topic',
    'mBoard.categories'
])
    .run(function ($rootScope, $state, $stateParams/*, AuthService*/) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //State events
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.error('Error while trying to change to state', toState, error);
            $state.go('topics');
        });
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            console.error('State not found: ', unfoundState, ', coming from', fromState);
            $state.go('topics');
        });

        $rootScope.$on('$viewContentLoaded', function (event) {
        });

        ///////////////////////////////////////////////////
        //              External APIs
        //////////////////////////////////////////////////
        var PARSE_APP_ID = 'yxPJx5ySs8SWgumIEs2JfYVsI1OTU6MtN2C1iG8U',
            PARSE_JAVASCRIPT_KEY = '3t3byCFpjKO6RL48enhDucH7ETGtNAaxuUcJgTi6';

        //Initialize Parse
        Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

        var token = localStorage.getItem('sessionToken');
        if (token) {
            Parse.User.become(token).then(function (user) {
                // The current user is now set to user.
            }, function (error) {
                localStorage.removeItem('sessionToken');
                console.log(error);
            });
        }
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, toastrConfig) {
        'use strict';
        $httpProvider.interceptors.push('errorsInterceptor');
        $urlRouterProvider.when('', '/topics');
        $urlRouterProvider.otherwise('/topics');
        angular.extend(toastrConfig, {
            allowHtml: true,
            positionClass: 'toast-bottom-right'
        });
        //use the HTML5 History API
        $locationProvider.html5Mode(true);
    })
    .factory('errorsInterceptor', function ($q, $injector, toastr) {

        function responseError(rejection) {
            var data = rejection.data;
            var msg = data.error ? data.error.message || data.error.error : data;
            console.log('Server error:', msg);
            toastr.error('', msg);

            return $q.reject(rejection);
        }

        function request(config) {
            var token;
            $injector.invoke(function (AuthenticationSvc) {
                token = AuthenticationSvc.getToken();
            });

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        return {
            request: request,
            responseError: responseError
        };
    });