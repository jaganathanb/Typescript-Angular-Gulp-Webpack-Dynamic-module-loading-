/// <reference path="../../typings/tsd.d.ts" />
var HomeController = require('./home.controller');
// webpack will load the html. Nifty, eh?
require('./home.html'); // loading here doesnt works
// webpack will load this scss too
require('./home.scss');
module.exports = angular.module('Home', ['List'])
    .controller('HomeController', ['$scope', HomeController])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home1', {
            controller: 'HomeController',
            template: require('./home.html'),
            controllerAs: 'vm'
        });
    }]);

//# sourceMappingURL=index.js.map
