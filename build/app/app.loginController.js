/// <reference path="typings/angularjs/angular.d.ts" />
var LoginController = (function () {
    function LoginController($scope, $location, $route, authService) {
        this.$scope = $scope;
        this.$location = $location;
        this.$route = $route;
        this.authService = authService;
        this.loggedIn = false;
        authService.clearCredentials();
    }
    LoginController.prototype.login = function () {
        var vm = this;
        this.authService.login(this.username, this.password, function (response) {
            if (response.success) {
                vm.authService.setCredentials(vm.username, vm.password);
                vm.loggedIn = true;
                vm.$location.path('/home');
            }
            else {
                vm.error = response.message;
            }
        });
    };
    LoginController.$inject = ['$scope', '$location', '$route', 'authService'];
    return LoginController;
})();
module.exports = LoginController;

//# sourceMappingURL=app.loginController.js.map
