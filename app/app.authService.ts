/// <reference path="typings/tsd.d.ts" />
class AuthService {
	public static $inject: Array<string> = ['base64Service', '$http', '$cookieStore', '$rootScope', '$timeout'];
	
	private _base64:any;
	private _$http: any;
	private _$cookieStore: any;
	private _$rootScope: any;
	private _$timeout: ng.ITimeoutService;
	
	constructor(Base64:any, $http: any, $cookieStore: any, $rootScope: any, $timeout: ng.ITimeoutService) {
		this._base64 = Base64;
		this._$http = $http;
		this._$cookieStore = $cookieStore;
		this._$rootScope = $rootScope;
		this._$timeout = $timeout;
	}
	
	login(username:string, password:string, callback: Function): void {
		this._$timeout(() => {
            var response = { success: username === 'test' && password === 'test', message: '' };
            if (!response.success) {
                response.message = 'Username or password is incorrect';
            }
            callback(response);
        }, 1000);
	}
	
	getFeatures(): Array<string> {
		return this._$rootScope.globals.currentUser && this._$rootScope.globals.currentUser.features || [];
	}
	
	isLoggedIn(): boolean {
		var user = this._$cookieStore.get('globals');
		this._$rootScope.globals = user;
		return (user && user.currentUser);
	}
	
	setCredentials(username:string, password:string): void {
		var authdata = this._base64.encode(username + ':' + password);

        this._$rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata,
				features: ['user', 'admin']
            }
        };

        this._$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        this._$cookieStore.put('globals', this._$rootScope.globals);	
	}
	
	clearCredentials():void {
        this._$rootScope.globals = {currentUser: null};
        this._$cookieStore.remove('globals');
        this._$http.defaults.headers.common.Authorization = 'Basic ';
    }
	
}

export = AuthService;