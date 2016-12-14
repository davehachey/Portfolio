

angular.module('livecode').controller('MarketController', function($scope, $routeParams, Market, Auth, $location, AuthWaitForLogged) {
	if (AuthWaitForLogged == null) {
		// nobody is logged in
		$scope.isLoggedIn = false;
	}
	else {
		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
		$scope.welcomeMessage = "Hey "+$scope.currentUser.display_name;
	}
	
	console.log($routeParams.commodity_id);
	$scope.market=Market.getMarket($routeParams.commodity_id);
	$scope.bids=Market.getBids($routeParams.commodity_id);
	$scope.offers=Market.getOffers($routeParams.commodity_id);

	
	$scope.addListing = function() {
		$("#addListingModal").modal('show');

	};

	$scope.addNewListing = function(newListing) {
		console.log ("add new listing triggered");
		newListing.userid=AuthWaitForLogged.uid;
		if (newListing.type=="buy") {
			Market.addBid(newListing, $routeParams.commodity_id, $scope.market);
		}
		else if (newListing.type=="sell") {
		Market.addOffer(newListing, $routeParams.commodity_id, $scope.market);
		}
		else {
			alert("please enter whether you're buying or selling")
		}

	};
	$scope.sorterFunc = function(item){
   	return parseInt(item.price);
};

	$scope.logout = function() {
		Auth.logout().then(function() {
			$scope.isLoggedIn = false;
			$location.path("/login").replace();
		});
	};

		$scope.hitBid = function() {
			Market.makeOutgoingBid($scope.myOffer, AuthWaitForLogged.uid).then(function(){
				Market.makeIncomingBid($scope.myOffer, AuthWaitForLogged.displayName, AuthWaitForLogged.email);
			});
		};
		$scope.showHitBid = function(bid_id) {
		$scope.myOffer = Market.getBid($routeParams.commodity_id, bid_id);
		$("#hitBidModal").modal('show');

		}

		$scope.liftOffer = function() {
			Market.makeOutgoingBid($scope.myBid, AuthWaitForLogged.uid).then(function(){
				Market.makeIncomingBid($scope.myBid, AuthWaitForLogged.displayName, AuthWaitForLogged.email);
			});
		};
		$scope.showLiftOffer = function(offer_id) {
		$scope.myBid = Market.getOffer($routeParams.commodity_id, offer_id);
		$("#liftOfferModal").modal('show');

		}
});


