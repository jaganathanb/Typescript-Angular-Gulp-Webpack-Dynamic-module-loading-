/// <reference path="../../typings/tsd.d.ts" />
var ListController = require('./list.controller');
// webpack will load the html. Nifty, eh?
require('./list.html');
// webpack will load this scss too! 
require('./list.scss');
module.exports = angular.module('List', [])
    .controller('ListController', ['$scope', ListController]);

//# sourceMappingURL=index.js.map
