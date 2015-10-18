///<reference path='typings/tsd.d.ts' />
/// <reference path="typings/tagw.d.ts" />
var DashboardController = require('./app.dashboardController');
var LoginController = require('./app.loginController');
var AppController = require('./app.controller');
var ModuleProvider = require('./app.moduleProvider');
var AuthService = require('./app.authService');
var Base64 = require('./app.base64Service');
var routes = require('./app.routes');
var MainView = require('./app.mainview');
require('./app.login.html');
require('./app.dashboard.html'),
    require('./app.nav.html');
require('./app.scss');
require('bootstrap/dist/css/bootstrap.min.css');
module.exports = (function () {
    angular.module('ModuleLoader', []).
        provider('moduleProvider', ModuleProvider);
    angular.module('App', ['ng', 'ngRoute', 'ngCookies', 'ModuleLoader'])
        .controller('AppController', AppController)
        .controller('LoginController', LoginController)
        .controller('DashboardController', DashboardController)
        .service('authService', AuthService)
        .service('base64Service', Base64)
        .directive('mainView', ['$compile', 'authService', MainView.Factory()])
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            for (var routeIndex = 0, route; route = routes.routes[routeIndex]; routeIndex++) {
                $routeProvider.when(route.when, route.options);
            }
            $routeProvider.otherwise({ redirectTo: '/' });
            //$httpProvider.interceptors.push('authInterceptor');
        }])
        .run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
            $rootScope.$on('$routeChangeStart', function (event) {
                if (!authService.isLoggedIn()) {
                    $location.path('/');
                }
            });
        }]);
    angular.bootstrap(document, ['App']);
})();

//# sourceMappingURL=main.js.map
