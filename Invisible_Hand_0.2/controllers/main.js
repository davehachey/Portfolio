angular.module('livecode').controller('MainController', function($scope, Auth, $location, AuthWaitForLogged, Market) {

	if (AuthWaitForLogged == null) {

		// nobody is logged in
		$scope.isLoggedIn = false;
	}
	else {
		console.log(AuthWaitForLogged);

		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
		
		$scope.welcomeMessage = "Hey "+$scope.currentUser.display_name;
	}

	console.log('isLoggedIn');
	console.log($scope.isLoggedIn);

	$scope.marketList = Market.getMarkets();



	$scope.addMarket = function() {

		if ($scope.newMarket.name === undefined) {
			alert("Please enter all required information");
		}
		else {
			Market.addNewMarket($scope.newMarket.name).then(function() {
				console.log("Added!");
			});
		}
	};


	// $scope.showUpdateMarket = function(market_id) {
	// 	$scope.updateMarket = Market.getMarket(market_id);
	// 	$("#updateModal").modal('show');
	// };


	$scope.updateTheMarket = function(theMarket) {
		Market.saveMarket(theMarket).then(function() {
			alert("All good!");
		});
	};

	$scope.logout = function() {
		Auth.logout().then(function() {
			$scope.isLoggedIn = false;
			$location.path("/login").replace();
		});
	};
});




















