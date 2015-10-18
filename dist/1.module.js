webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/tsd.d.ts" />
	var HomeController = __webpack_require__(11);
	// webpack will load the html. Nifty, eh?
	__webpack_require__(8); // loading here doesnt works
	// webpack will load this scss too
	__webpack_require__(12);
	module.exports = angular.module('Home', ['List'])
	    .controller('HomeController', ['$scope', HomeController])
	    .config(['$routeProvider', function ($routeProvider) {
	        $routeProvider
	            .when('/home1', {
	            controller: 'HomeController',
	            template: __webpack_require__(8),
	            controllerAs: 'vm'
	        });
	    }]);

	//# sourceMappingURL=index.js.map


/***/ },
/* 11 */
/***/ function(module, exports) {

	/// <reference path="../../typings/tsd.d.ts" />
	var HomeController = (function () {
	    function HomeController() {
	        this.message = 'This is home!';
	        this.title = 'Home Module';
	    }
	    return HomeController;
	})();
	module.exports = HomeController;

	//# sourceMappingURL=home.controller.js.map


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./home.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./home.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, ".list-item {\n  color: blue; }\n", ""]);

	// exports


/***/ }
]);