angular.module('livecode').controller('LoginController', function($scope, Auth, $location, AuthWaitForLogged) {

	if (AuthWaitForLogged == null) {

		// nobody is logged in
		$scope.isLoggedIn = false;
		console.log(AuthWaitForLogged)
	}
	else {
		$location.path('/').replace();
		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
		
		$scope.welcomeMessage = "Hey "+$scope.currentUser.display_name;
		console.log(AuthWaitForLogged)
	}

	$scope.loginWithFacebook = function() {
		
		// login with Facebook
		Auth.loginWithFacebook().then(function(firebaseUser) {
			$scope.currentUser = Auth.checkUser(firebaseUser.user);
			$scope.isLoggedIn = true;
			$location.path('/').replace();
			// console.log("Signed in as:", firebaseUser.user.displayName);
			// console.log(firebaseUser);
		}).catch(function(error) {
			console.log("Authentication failed:", error);
		});
	};

	$scope.loginWithGoogle = function() {
		
		// login with Twitter
		Auth.loginWithGoogle().then(function(firebaseUser) {
			$scope.currentUser = Auth.checkUser(firebaseUser.user);
			$scope.isLoggedIn = true;
			// console.log("Signed in as:", firebaseUser.user.displayName);
			// console.log(firebaseUser);
			$location.path('/').replace();
		}).catch(function(error) {
			console.log("Authentication failed:", error);
		});
	};



	$scope.logout = function() {

		Auth.logout().then(function() {
			$scope.isLoggedIn = false;
		});
	};
});




















