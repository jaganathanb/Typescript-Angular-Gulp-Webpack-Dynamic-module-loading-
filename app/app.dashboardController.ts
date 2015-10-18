/// <reference path="typings/tsd.d.ts" />

class DashboardController {
	static $inject: Array<string> = ['$scope', '$location', '$route', 'authService', 'moduleProvider'];
	public message: string;
	public navItems: Array<Object> = [];
	public dataLoading: boolean = true;

	constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $route:any, private authService: any, private moduleProvider: any) {
		this.message = 'Welcome to TAGW!';
				
		this.navItems = [
			{
				title: 'Home', url: '/home', tooltip: 'Click here for home screen', class: 'glyphicon glyphicon-plane'
			}, {
				title: 'List', url: '/list', tooltip: 'Click here for list screen', class: 'glyphicon glyphicon-cloud'
			}, {
				title: 'Logout', url: '/logout', tooltip: 'Click here for logout', class: 'glyphicon glyphicon-logout'
			}
		];
	}

	navigate(url: string): void {
		if (url === '/logout') {
			this.logout();
		} else {
			this.$location.path(url);
		}
	}

	logout(): void {
		this.authService.clearCredentials();
		this.$location.path('');
	}

}

export = DashboardController;