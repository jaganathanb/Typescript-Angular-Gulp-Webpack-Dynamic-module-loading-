/// <reference path="typings/tsd.d.ts" />

class AppController {
	public static $inject: Array<string> = ['$scope', '$location', '$route', 'authService', 'moduleProvider'];
	public navItems: Array<Object> = [];
	public dataLoading: boolean = true;
	public username: string;
	public password: string;
	public error: string;
	public loggedIn: boolean;

	constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $route:any, private authService: any, private moduleProvider: any) {
		
		this.loggedIn = authService.isLoggedIn();
		
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
		this.$location.path('/');
		this.loggedIn = this.authService.isLoggedIn();
		this.username = '';
		this.password = '';
	}

	login(): void {
		var vm = this;
		this.dataLoading = true;
		this.authService.login(this.username, this.password, function(response) {
			if (response.success) {
				vm.authService.setCredentials(vm.username, vm.password);
				vm.loggedIn = true;
				vm.$location.path('/home');
			} else {
				vm.error = response.message;
				vm.dataLoading = false;
			}
		});
	}

}

export = AppController;