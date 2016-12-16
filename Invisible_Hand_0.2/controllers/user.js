
angular.module('livecode').controller('UserController', function($scope, $routeParams, Market, Auth, $location, AuthWaitForLogged) {
	if (AuthWaitForLogged == null) {
		// nobody is logged in
		$scope.isLoggedIn = false;
	}
	else {
		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);	
		$scope.listings=Market.getProfileListings(AuthWaitForLogged.uid);
		$scope.messages=Market.getProfileOffers(AuthWaitForLogged.uid);	

	}
	
	$scope.writeReview = function(user_id, offer_id) {
		console.log($scope.currentUser);
		$scope.myReview = Market.getOffer(user_id, offer_id);
		$("#writeReviewModal").modal('show');
		}

	$scope.submitReview = function() {
		console.log($scope.myReview);
		var profile=Auth.getProfile($scope.myReview.userid);
		profile.$loaded().then(function(ref){
			if (!Array.isArray(profile.reviews)){
				profile.reviews=[];
			}

			profile.reviews.push($scope.myReview);
			Auth.saveProfile(profile).then(function(){
				$("#writeReviewModal").modal('hide');
				$('#myModal').on('hidden.bs.modal', function () {
    		

});
			});
		})
	}
	$scope.removeListing = function (listing_id, type, commodity_id, profilelisting_id){
		Market.removeListing(listing_id, AuthWaitForLogged.uid, type, commodity_id, profilelisting_id);
	}
});

		



