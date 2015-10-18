/// <reference path="typings/tsd.d.ts" />
var AppController = (function () {
    function AppController($scope, $location, $route, authService, moduleProvider) {
        this.$scope = $scope;
        this.$location = $location;
        this.$route = $route;
        this.authService = authService;
        this.moduleProvider = moduleProvider;
        this.navItems = [];
        this.dataLoading = true;
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
    AppController.prototype.navigate = function (url) {
        if (url === '/logout') {
            this.logout();
        }
        else {
            this.$location.path(url);
        }
    };
    AppController.prototype.logout = function () {
        this.authService.clearCredentials();
        this.$location.path('/');
        this.loggedIn = this.authService.isLoggedIn();
        this.username = '';
        this.password = '';
    };
    AppController.prototype.login = function () {
        var vm = this;
        this.dataLoading = true;
        this.authService.login(this.username, this.password, function (response) {
            if (response.success) {
                vm.authService.setCredentials(vm.username, vm.password);
                vm.loggedIn = true;
                vm.$location.path('/home');
            }
            else {
                vm.error = response.message;
                vm.dataLoading = false;
            }
        });
    };
    AppController.$inject = ['$scope', '$location', '$route', 'authService', 'moduleProvider'];
    return AppController;
})();
module.exports = AppController;

//# sourceMappingURL=app.controller.js.map
