/// <reference path="typings/tsd.d.ts" />
var MainView = (function () {
    function MainView($compile, authService) {
        var _this = this;
        this.$compile = $compile;
        this.authService = authService;
        // #region Angular directive properties, fields, and methods
        this.template = '<div ng-transclude>Welcome!!</div>';
        this.scope = true;
        this.restrict = 'EA';
        this.replace = true;
        this.transclude = true;
        this.link = function (scope, element, attributes, controller, transcludeFn) {
            var that = _this;
            var ele;
            scope.$watch('app.loggedIn', function (loggedIn) {
                if (loggedIn) {
                    ele = angular.element('<section dashboard ng-include="\'app.dashboard.html\'"></section>');
                }
                else {
                    ele = angular.element('<section login ng-include="\'app.login.html\'"></section>');
                }
                element.empty();
                that.$compile(ele)(scope);
                element.append(ele);
            });
        };
    }
    MainView.Factory = function () {
        var directive = function (compile, authService) { return new MainView(compile, authService); };
        return directive;
    };
    MainView.prototype.destruct = function () {
    };
    return MainView;
})();
module.exports = MainView;

//# sourceMappingURL=app.mainview.js.map
