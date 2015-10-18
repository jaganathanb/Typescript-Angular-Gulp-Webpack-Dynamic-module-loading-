/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/tagw.d.ts" />
var ModuleProvider = (function () {
    function ModuleProvider($controllerProvider, $provide, $compileProvider, $filterProvider, $injector, $routeProvider) {
        this._providers = {};
        this._modulesLoaded = [];
        this._providers.$controllerProvider = $controllerProvider;
        this._providers.$provide = $provide;
        this._providers.$compileProvider = $compileProvider;
        this._providers.$filterProvider = $filterProvider;
        this._providers.$injector = $injector;
        this._providers.$routeProvider = $routeProvider;
        this.$get.$inject = ['$q', '$rootScope'];
    }
    ModuleProvider.prototype.$get = function ($q, $rootScope) {
        var _this = this;
        return {
            loadModule: function (config) {
                _this.register(_this._providers, [config.name]);
            }
        };
    };
    ModuleProvider.prototype.register = function (providers, moduleNames) {
        var i, ii, k, invokeQueue, moduleName, moduleFn, invokeArgs, provider;
        if (moduleNames) {
            var runBlocks = [];
            for (k = moduleNames.length - 1; k >= 0; k--) {
                moduleName = moduleNames[k];
                moduleFn = angular.module(moduleName);
                if (this._modulesLoaded.indexOf(moduleName) >= 0) {
                    continue;
                }
                this._modulesLoaded.push(moduleName);
                runBlocks = runBlocks.concat(moduleFn._runBlocks);
                try {
                    for (invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
                        invokeArgs = invokeQueue[i];
                        if (providers.hasOwnProperty(invokeArgs[0])) {
                            provider = providers[invokeArgs[0]];
                        }
                        else {
                            return 'Unknow provider!';
                        }
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                    }
                    for (var configIndex = 0; configIndex < moduleFn._configBlocks.length; configIndex++) {
                        var config = moduleFn._configBlocks[configIndex];
                        providers[config[0]][config[1]](config[2][0][1]);
                    }
                }
                catch (e) {
                    if (e.message) {
                        e.message += ' from ' + moduleName;
                    }
                    return e.message;
                    throw e;
                }
                moduleNames.pop();
            }
            angular.forEach(runBlocks, function (fn) {
                providers.$injector.invoke(fn);
            });
        }
        return null;
    };
    return ModuleProvider;
})();
ModuleProvider.$inject = ['$controllerProvider', '$provide', '$compileProvider', '$filterProvider', '$injector', '$routeProvider'];
module.exports = ModuleProvider;

//# sourceMappingURL=app.moduleProvider.js.map
