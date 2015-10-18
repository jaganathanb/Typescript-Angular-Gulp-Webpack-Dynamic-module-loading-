///<reference path='typings/tsd.d.ts' />
/// <reference path="typings/tagw.d.ts" />

import Module = require('./app.moduleLoader');
import DashboardController = require('./app.dashboardController');
import LoginController = require('./app.loginController');
import AppController = require('./app.controller');
import ModuleProvider = require('./app.moduleProvider');
import AuthService = require('./app.authService');
import Base64 = require('./app.base64Service');
import routes = require('./app.routes');
import AuthInterceptor = require('./app.interceptor');
import MainView = require('./app.mainview');

require('./app.login.html');
require('./app.dashboard.html'),
require('./app.nav.html');
require('./app.scss');
require('bootstrap/dist/css/bootstrap.min.css');

export = (() => {
	angular.module('ModuleLoader', []).
		provider('moduleProvider', ModuleProvider);

	angular.module('App', ['ng', 'ngRoute', 'ngCookies', 'ModuleLoader'])
		.controller('AppController', AppController)
		.controller('LoginController', LoginController)
		.controller('DashboardController', DashboardController)
		.service('authService', AuthService)
		.service('base64Service', Base64)
	//.service('authInterceptor', AuthInterceptor)
		.directive('mainView', ['$compile', 'authService', MainView.Factory()])
		.config(['$routeProvider', '$httpProvider', ($routeProvider: any, $httpProvider: ng.IHttpProvider) => {
			for (var routeIndex = 0, route: any; route = routes.routes[routeIndex]; routeIndex++) {
				$routeProvider.when(route.when, route.options);
			}
			$routeProvider.otherwise({ redirectTo: '/' });
			
			//$httpProvider.interceptors.push('authInterceptor');
		}])
		.run(['$rootScope', '$location', 'authService', function($rootScope: any, $location: any, authService: any) {
			$rootScope.$on('$routeChangeStart', function(event: UIEvent) {
				if (!authService.isLoggedIn()) {
					$location.path('/');
				}
			});
		}]);
	angular.bootstrap(document, ['App']);
})();