var app = angular.module('livecode', [
	'ngRoute',
	'firebase',
]);

angular.module('livecode').config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'templates/main.html',
		controller: 'MainController',
		resolve: {
	  		AuthWaitForLogged: function(Auth) {
	  			return Auth.getAuth().$waitForSignIn();
	  		}
		}
		})

	.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController',
		resolve: {
		  	AuthWaitForLogged: function(Auth) {
		  		return Auth.getAuth().$waitForSignIn();
		    } 
		}
	})

		.when('/user', {
		templateUrl: 'templates/user.html',
		controller: 'UserController',
		resolve: {
	  		AuthWaitForLogged: function(Auth) {
	  			return Auth.getAuth().$waitForSignIn();
	  		}
		}
		})

	.when('/commodity/:commodity_id', {
		templateUrl: 'templates/commodity.html',
		controller: 'MarketController',
		resolve: {
		  	AuthWaitForLogged: function(Auth) {
		  		return Auth.getAuth().$waitForSignIn();
		    } 
		}
	})
		

	.otherwise('/')
});
