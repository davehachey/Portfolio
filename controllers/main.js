angular.module('livecode', []).controller('MainController', function($scope) {
	
	var responseType = 0;

	$scope.message = "Hey UIT Class!";
	$scope.showTypeName = false;
	
	$scope.respond = function() {
		if (responseType == 0) {
			responseType = 1;
			$scope.message = "Let's get this class started!";
		}
		else {
			responseType = 0;
			$scope.message = "Let's go!";
		}
	};

	$scope.showTypeNameWindow = function() {
		
	}
});