/// <reference path="typings/tsd.d.ts" />
var AuthService = (function () {
    function AuthService(Base64, $http, $cookieStore, $rootScope, $timeout) {
        this._base64 = Base64;
        this._$http = $http;
        this._$cookieStore = $cookieStore;
        this._$rootScope = $rootScope;
        this._$timeout = $timeout;
    }
    AuthService.prototype.login = function (username, password, callback) {
        this._$timeout(function () {
            var response = { success: username === 'test' && password === 'test', message: '' };
            if (!response.success) {
                response.message = 'Username or password is incorrect';
            }
            callback(response);
        }, 1000);
    };
    AuthService.prototype.getFeatures = function () {
        return this._$rootScope.globals.currentUser && this._$rootScope.globals.currentUser.features || [];
    };
    AuthService.prototype.isLoggedIn = function () {
        var user = this._$cookieStore.get('globals');
        this._$rootScope.globals = user;
        return (user && user.currentUser);
    };
    AuthService.prototype.setCredentials = function (username, password) {
        var authdata = this._base64.encode(username + ':' + password);
        this._$rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata,
                features: ['user', 'admin']
            }
        };
        this._$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        this._$cookieStore.put('globals', this._$rootScope.globals);
    };
    AuthService.prototype.clearCredentials = function () {
        this._$rootScope.globals = { currentUser: null };
        this._$cookieStore.remove('globals');
        this._$http.defaults.headers.common.Authorization = 'Basic ';
    };
    AuthService.$inject = ['base64Service', '$http', '$cookieStore', '$rootScope', '$timeout'];
    return AuthService;
})();
module.exports = AuthService;

//# sourceMappingURL=app.authService.js.map
