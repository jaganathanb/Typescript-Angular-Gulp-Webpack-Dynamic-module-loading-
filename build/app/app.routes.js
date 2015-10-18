///<reference path='typings/tsd.d.ts' />
exports.routes = [{
        when: '/home',
        options: {
            controller: 'HomeController',
            template: require('./modules/home/home.html'),
            controllerAs: 'vm',
            resolve: {
                loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
                        var defered = $q.defer();
                        if (authService.isLoggedIn()) {
                            require.ensure([], function () {
                                require('./modules/home');
                                moduleProvider.loadModule({ name: 'Home', path: 'modules/home' });
                                defered.resolve();
                            });
                        }
                        else {
                            defered.reject();
                        }
                        return defered.promise;
                    }]
            }
        } },
    {
        when: '/list',
        options: {
            controller: 'ListController',
            template: require('./modules/list/list.html'),
            controllerAs: 'vm',
            resolve: {
                loadHomeModule: ['$q', 'authService', 'moduleProvider', '$location', function ($q, authService, moduleProvider, $location) {
                        var defered = $q.defer();
                        if (authService.isLoggedIn()) {
                            require.ensure([], function () {
                                require('./modules/list');
                                moduleProvider.loadModule({ name: 'List', path: 'modules/list' });
                                defered.resolve();
                            });
                        }
                        return defered.promise;
                    }]
            } }
    }
];

//# sourceMappingURL=app.routes.js.map
