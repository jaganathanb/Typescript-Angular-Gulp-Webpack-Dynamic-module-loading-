//Method name should be exactly "response" - http://docs.angularjs.org/api/ng/service/$http
/// <reference path="typings/tsd.d.ts" />
var AuthInterceptor = (function () {
    function AuthInterceptor($injector, $q, $templateCache) {
        var _this = this;
        this.$injector = $injector;
        this.$q = $q;
        this.$templateCache = $templateCache;
        // Keep track which HTML templates have already been modified.
        this._modifiedTemplates = {};
        // Tests if there are any keep/omit attributes.
        this.HAS_FLAGS_EXP = /data-(keep|omit)/;
        // Tests if the requested url is a html page.
        this.IS_HTML_PAGE = /\.html$|\.html\?/i;
        this.request = function (requestSuccess) {
            return requestSuccess;
        };
        this.requestError = function (requestFailure) {
            return requestFailure;
        };
        this.response = function (response) {
            var that = _this;
            var url = response.config.url, responseData = response.data, authService = _this.$injector.get('authService');
            ;
            if (!_this._modifiedTemplates[url] && _this.IS_HTML_PAGE.test(url) && _this.HAS_FLAGS_EXP.test(responseData)) {
                // Create a DOM fragment from the response HTML.
                var template = $('<div>').append(responseData);
                // Find and parse the keep/omit attributes in the view.
                template.find('[data-keep],[data-omit]').each(function () {
                    var element = $(this), data = element.data(), keep = data.keep, features = keep || data.omit || '';
                    var userFeatures = authService.getFeatures();
                    // Check if the user has all of the specified features.
                    var hasFeature = _.all(features.split(','), function (feature) {
                        return userFeatures[feature];
                    });
                    if (features.length && ((keep && !hasFeature) || (!keep && hasFeature))) {
                        element.remove();
                    }
                });
                // Set the modified template.
                response.data = template.html();
                // Replace the template in the template cache, and mark the
                // template as modified.
                _this.$templateCache.put(url, response.data);
                _this._modifiedTemplates[url] = true;
            }
            return response;
        };
        this.responseError = function (responseFailure) {
            return _this.$q.reject(responseFailure);
        };
    }
    AuthInterceptor.Factory = function ($injector, $q, $templateCache) {
        return new AuthInterceptor($injector, $q, $templateCache);
    };
    AuthInterceptor.$inject = ["$injector", "$q", '$templateCache'];
    return AuthInterceptor;
})();
module.exports = AuthInterceptor;

//# sourceMappingURL=app.interceptor.js.map
