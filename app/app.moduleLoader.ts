/// <reference path='typings/tsd.d.ts' />
/// <reference path="typings/tagw.d.ts" />

class Module {
    
    private _routes: Array<any> = [];
    private _configInjectables: Array<any> = [];
    private _configFn: Function;

    app: ng.IModule
    constructor(name: string, modules: Array<string> = [], configInjectables: Array<string> = ['$routeProvider']) {
        this.app = angular.module(name, modules);
        this._configInjectables = configInjectables;
    }

    addController(name: string, controller: Function) {
        this.app.controller(name, controller);
    }

    addDiretive(name: string, directive: ng.IDirectiveFactory) {
        this.app.directive(name, directive);
    }

    addProvider(name: string, provider: ng.IServiceProviderClass) {
        this.app.provider(name, provider);
    }

    addService(name:string, service: Function) {
        this.app.factory(name, service);
     }

    addRoutes(routes: Array<any>): void {
        this._routes = routes;
    }

    run(initializationFn: Function): void {
        this.app.run(initializationFn);
    }
    
    config(configFn: Function): void {
        this.app.config(this._configInjectables.concat((...args) => {    
            configFn();            
        }));
    }
    
    bootstrap(element:Document, moduleName): void {
        angular.bootstrap(element, [moduleName]);
    }

}

export = Module;