/// <reference path="typings/angularjs/angular.d.ts" />

class LoginController {
	static $inject: Array<string> = ['$scope', '$location', '$route', 'authService'];
	username: string;
	password: string;
	error: string;
	loggedIn: boolean;

	constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private $route:any, private authService: any) {
		
		this.loggedIn = false;
		
		authService.clearCredentials();
	}

	login(): void {
		var vm = this;
		this.authService.login(this.username, this.password, function(response) {
			if (response.success) {
				vm.authService.setCredentials(vm.username, vm.password);
				vm.loggedIn = true;
				vm.$location.path('/home');
			} else {
				vm.error = response.message;
			}
		});
	}

}

export = LoginController;