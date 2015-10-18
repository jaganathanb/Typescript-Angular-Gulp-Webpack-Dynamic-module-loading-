webpackJsonp([2],{

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/tsd.d.ts" />
	var ListController = __webpack_require__(17);
	// webpack will load the html. Nifty, eh?
	__webpack_require__(9);
	// webpack will load this scss too! 
	__webpack_require__(18);
	module.exports = angular.module('List', [])
	    .controller('ListController', ['$scope', ListController]);

	//# sourceMappingURL=index.js.map


/***/ },

/***/ 17:
/***/ function(module, exports) {

	var ListController = (function () {
	    function ListController() {
	        this.apps = [
	            { name: 'Gmail' },
	            { name: 'Facebook' },
	            { name: 'Twitter' },
	            { name: 'LinkedIn' }
	        ];
	        this.title = 'Applications';
	    }
	    return ListController;
	})();
	module.exports = ListController;

	//# sourceMappingURL=list.controller.js.map


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./list.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./list.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, ".list-item {\n  color: blue; }\n", ""]);

	// exports


/***/ }

});