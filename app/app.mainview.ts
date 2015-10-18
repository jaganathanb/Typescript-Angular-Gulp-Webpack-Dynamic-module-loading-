/// <reference path="typings/tsd.d.ts" />

class MainView implements ng.IDirective {

    // #region Angular directive properties, fields, and methods

    template = '<div ng-transclude>Welcome!!</div>';
    scope = true;
    restrict = 'EA'
    replace = true;
    transclude = true;

    constructor(private $compile, private authService) {

    }

    link = (scope, element, attributes, controller, transcludeFn) => {
        var that = this;
        var ele;
        scope.$watch('app.loggedIn', function(loggedIn) {
            if (loggedIn) {
                ele = angular.element('<section dashboard ng-include="\'app.dashboard.html\'"></section>');
            } else {
                ele = angular.element('<section login ng-include="\'app.login.html\'"></section>');
            }
            element.empty();
            that.$compile(ele)(scope);
            element.append(ele);
        });
    }

    public static Factory() {

        const directive = (compile, authService) => new MainView(compile, authService);
        return directive;
    }

    private destruct() {

    }

}

export = MainView;