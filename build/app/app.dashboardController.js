/// <reference path="typings/tsd.d.ts" />
var DashboardController = (function () {
    function DashboardController($scope, $location, $route, authService, moduleProvider) {
        this.$scope = $scope;
        this.$location = $location;
        this.$route = $route;
        this.authService = authService;
        this.moduleProvider = moduleProvider;
        this.navItems = [];
        this.dataLoading = true;
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
    DashboardController.prototype.navigate = function (url) {
        if (url === '/logout') {
            this.logout();
        }
        else {
            this.$location.path(url);
        }
    };
    DashboardController.prototype.logout = function () {
        this.authService.clearCredentials();
        this.$location.path('');
    };
    DashboardController.$inject = ['$scope', '$location', '$route', 'authService', 'moduleProvider'];
    return DashboardController;
})();
module.exports = DashboardController;

//# sourceMappingURL=app.dashboardController.js.map
