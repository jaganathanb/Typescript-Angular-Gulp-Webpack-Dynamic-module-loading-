/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/tagw.d.ts" />

class ModuleProvider {
	private _providers: any = {};
	private _modulesLoaded: Array<string> = [];

	constructor($controllerProvider: ng.IControllerProvider, $provide: ng.IServiceProvider, $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider, $injector: ng.IInjectStatic, $routeProvider: any) {
		this._providers.$controllerProvider = $controllerProvider;
		this._providers.$provide = $provide;
		this._providers.$compileProvider = $compileProvider;
		this._providers.$filterProvider = $filterProvider;
		this._providers.$injector = $injector;
		this._providers.$routeProvider = $routeProvider;

		this.$get.$inject = ['$q', '$rootScope'];
	}

	$get($q: ng.IQService, $rootScope: any) {

		return {
			loadModule: (config: any) => {
				this.register(this._providers, [config.name]);
			}
		};
	}

	register(providers: any, moduleNames: Array<string>): string {
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
						} else {
							return 'Unknow provider!';
						}
						provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
					}

					for (var configIndex = 0; configIndex < moduleFn._configBlocks.length; configIndex++) {
						var config = moduleFn._configBlocks[configIndex];
						providers[config[0]][config[1]](config[2][0][1]);

					}

				} catch (e) {
					if (e.message) {
						e.message += ' from ' + moduleName;
					}
					return e.message;
					throw e;
				}
				moduleNames.pop();
			}
			angular.forEach(runBlocks, function(fn) {
				providers.$injector.invoke(fn);
			});
		}
		return null;
	}
}

ModuleProvider.$inject = ['$controllerProvider', '$provide', '$compileProvider', '$filterProvider', '$injector', '$routeProvider'];

export = ModuleProvider;