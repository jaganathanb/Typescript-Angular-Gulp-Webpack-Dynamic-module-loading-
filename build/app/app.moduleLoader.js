/// <reference path='typings/tsd.d.ts' />
/// <reference path="typings/tagw.d.ts" />
var Module = (function () {
    function Module(name, modules, configInjectables) {
        if (modules === void 0) { modules = []; }
        if (configInjectables === void 0) { configInjectables = ['$routeProvider']; }
        this._routes = [];
        this._configInjectables = [];
        this.app = angular.module(name, modules);
        this._configInjectables = configInjectables;
    }
    Module.prototype.addController = function (name, controller) {
        this.app.controller(name, controller);
    };
    Module.prototype.addDiretive = function (name, directive) {
        this.app.directive(name, directive);
    };
    Module.prototype.addProvider = function (name, provider) {
        this.app.provider(name, provider);
    };
    Module.prototype.addService = function (name, service) {
        this.app.factory(name, service);
    };
    Module.prototype.addRoutes = function (routes) {
        this._routes = routes;
    };
    Module.prototype.run = function (initializationFn) {
        this.app.run(initializationFn);
    };
    Module.prototype.config = function (configFn) {
        this.app.config(this._configInjectables.concat(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            configFn();
        }));
    };
    Module.prototype.bootstrap = function (element, moduleName) {
        angular.bootstrap(element, [moduleName]);
    };
    return Module;
})();
module.exports = Module;

//# sourceMappingURL=app.moduleLoader.js.map
