/// <reference path="../../typings/tsd.d.ts" />

import ListController = require('./list.controller');
    // webpack will load the html. Nifty, eh?
    require('./list.html');
    // webpack will load this scss too! 
    require('./list.scss');

export = angular.module('List', [])
    .controller( 'ListController', ['$scope', ListController]);