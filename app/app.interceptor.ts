//Method name should be exactly "response" - http://docs.angularjs.org/api/ng/service/$http
/// <reference path="typings/tsd.d.ts" />
    
interface IInterceptor {
    request: Function;
    requestError: Function;
    response: Function;
    responseError: Function;
}

class AuthInterceptor implements IInterceptor {
    public static $inject = ["$injector", "$q", '$templateCache'];
        
    // Keep track which HTML templates have already been modified.
    private _modifiedTemplates: any = {};        
        
    // Tests if there are any keep/omit attributes.
    private HAS_FLAGS_EXP: any = /data-(keep|omit)/;
    
    // Tests if the requested url is a html page.
    private IS_HTML_PAGE: any = /\.html$|\.html\?/i;

    public static Factory($injector: ng.IInjectStatic, $q: ng.IQService, $templateCache: ng.ITemplateCacheService) {
        return new AuthInterceptor($injector, $q, $templateCache);
    }

    constructor(private $injector: any, private $q: ng.IQService, private $templateCache: ng.ITemplateCacheService) {
        
    }

    public request: Function = (requestSuccess: any): ng.IPromise<any> => {
        return requestSuccess;
    }
    public requestError: Function = (requestFailure: any): ng.IPromise<any> => {
        return requestFailure;
    }
    
    public response: Function = (response: any): ng.IPromise<any> => {
        
        var that = this;
        var url = response.config.url,
            responseData = response.data,
            authService = this.$injector.get('authService');;

        if (!this._modifiedTemplates[url] && this.IS_HTML_PAGE.test(url) && this.HAS_FLAGS_EXP.test(responseData)) {
              
            // Create a DOM fragment from the response HTML.
            var template = $('<div>').append(responseData);
          
            // Find and parse the keep/omit attributes in the view.
            template.find('[data-keep],[data-omit]').each(function() {
                var element = $(this),
                    data = element.data(),
                    keep = data.keep,
                    features = keep || data.omit || '';
                    
               var userFeatures = authService.getFeatures();
                
                // Check if the user has all of the specified features.
                var hasFeature = _.all(features.split(',') , function(feature: any) {
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
            this.$templateCache.put(url, response.data);
            this._modifiedTemplates[url] = true;
        }

        return response;
    }
    public responseError: Function = (responseFailure: any): ng.IPromise<any> => {
        return this.$q.reject(responseFailure);
    }
}

export = AuthInterceptor;