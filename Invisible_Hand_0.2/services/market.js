angular.module('livecode').factory('Market', function($firebaseArray, $firebaseObject) {
	var marketRef = firebase.database().ref().child("markets");
	var marketListingBuyRef = firebase.database().ref().child("market_listings_buy");
	var marketListingSellRef = firebase.database().ref().child("market_listings_sell");
	var profileListingRef = firebase.database().ref().child("profile_listings");
	var profileOffersRef = firebase.database().ref().child("profile_offers");
	var profileBidsRef = firebase.database().ref().child("profile_bids");


	var Market = {
		markets: [],

		addNewMarket: function(newMarket) {
			var market={
				commodity:newMarket,
				numberofbids:0,
				numberofoffers:0,
				numberoftransactions:0
			};
			return Market.markets.$add(market);
		},

		getMarkets: function() {
			return Market.markets;
		},

		getMarket: function(market_id) {
			var individualMarketRef = marketRef.child(market_id);
			return $firebaseObject(individualMarketRef);
		},

		saveMarket: function(theMarket) {
			return theMarket.$save();
		},

		addBid: function(newListing, commodity_id, market) {
			var individualMarketRef = marketListingBuyRef.child(commodity_id);
			var listings= $firebaseArray(individualMarketRef);
			newListing.commodity = market.commodity;
			listings.$add(newListing).then (function(theNewListing) {
				var individualProfileMarketRef = profileListingRef.child(newListing.userid);
				var profileListings= $firebaseArray(individualProfileMarketRef);
				var profileListingInfo= {
					commodity_id:market.$id,
					commodity:market.commodity,
					side:"bid",
					size:newListing.size,
					price:newListing.price,
					description:newListing.description,
					listing_id:theNewListing.key,
				};
				return profileListings.$add(profileListingInfo);
			});
		},	

		addOffer: function(newListing, commodity_id, market) {
			var individualMarketRef = marketListingSellRef.child(commodity_id);
			var listings= $firebaseArray(individualMarketRef);
				newListing.commodity = market.commodity;
				listings.$add(newListing).then (function(theNewListing) {
				var individualProfileMarketRef = profileListingRef.child(newListing.userid);
				var profileListings= $firebaseArray(individualProfileMarketRef);
				var profileListingInfo= {
					commodity_id:market.$id,
					commodity:market.commodity,
					side:"offer",
					size:newListing.size,
					price:newListing.price,
					description:newListing.description,
					listing_id:theNewListing.key,
				};
				return profileListings.$add(profileListingInfo);
			});

		},

		getBids: function(market_id) {
			var individualMarketRef = marketListingBuyRef.child(market_id);
			return $firebaseArray(individualMarketRef);
		},

		getBid: function(market_id, bid_id) {
			console.log(market_id);
			console.log(bid_id);
			var individualMarketRef = marketListingBuyRef.child(market_id).child(bid_id);

			return $firebaseObject(individualMarketRef);
		},

		makeOutgoingBid: function(newBid, user_id) {
			var individualProfileOffersRef = profileOffersRef.child(user_id);
			var offers= $firebaseArray(individualProfileOffersRef);
			var newBidside="bid";
			if (newBid.type=="buy"){
				newBidside="offer";

			}
			console.log(newBid.side)
			console.log(newBid)
			var offerInfo= {
				commodity:newBid.commodity,
				type:"outgoing",
				side:newBidside,
				size:newBid.size,
				price:newBid.price,
				description:newBid.description,
				userid:newBid.userid,
			};
			return offers.$add(offerInfo);
		},	

//

	makeIncomingBid: function(newBid, name, email) {
		console.log("triggered");
			var individualProfileOffersRef = profileOffersRef.child(newBid.userid);
			var offers= $firebaseArray(individualProfileOffersRef);
			var newBidside="bid";
			if (newBid.type=="buy"){
				newBidside="offer";
			}
			if (newBid.message==undefined){
				newBid.message="";
			}
			console.log(newBid);
			var offerInfo= {
				commodity:newBid.commodity,
				type:"incoming",
				name:name,
				email:email,
				side:newBidside,
				size:newBid.size,
				price:newBid.price,
				description:newBid.message,
			};
			console.log(offerInfo);
			return offers.$add(offerInfo);
		},	

	makeOutgoingOffer: function(newOffer, user_id) {
			var individualProfileBidsRef = profileBidsRef.child(user_id);
			var bids= $firebaseArray(individualProfileBidsRef);
			var newOfferside="offer";
			if (newOffer.type=="offer"){
				newOfferside="bid";

			}
			if (newOffer.message==undefined){
				newOffer.message="";
			}
			console.log(newOffer.side)
			console.log(newOffer)
			var bidInfo= {
				commodity:newOffer.commodity,
				type:"outgoing",
				side:newOfferside,
				size:newOffer.size,
				price:newOffer.price,
				description:newOffer.message,
				userid:newOffer.userid,
			};
			return bids.$add(bidInfo);
		},	

	makeIncomingOffer: function(newOffer, name, email) {
		console.log("triggered");
			var individualProfileBidsRef = profileBidsRef.child(newOffer.userid);
			var bids= $firebaseArray(individualProfileBidsRef);
			var newOfferside="offer";
			if (newOffer.type=="sell"){
				newOfferside="bid";
			}
			console.log(newOffer);
			var bidInfo= {
				commodity:newOffer.commodity,
				type:"incoming",
				name:name,
				email:email,
				side:newOfferside,
				size:newOffer.size,
				price:newOffer.price,
				description:newOffer.description,
			};
			console.log(bidInfo);
			return bids.$add(bidinfo);
		},	



		getOffers: function(market_id) {
			var individualMarketRef = marketListingSellRef.child(market_id);
			return $firebaseArray(individualMarketRef);
		},

		getOffer: function(user_id, offer_id) {
			var individualMarketRef = marketListingSellRef.child(user_id).child(offer_id);
			return $firebaseObject(individualMarketRef);
		},


		getProfileListings: function(user_id) {
			var individualListingsRef = profileListingRef.child(user_id);
			return $firebaseArray(individualListingsRef);
		},

		getProfileOffers: function(user_id) {
			var individualListingsRef = profileOffersRef.child(user_id);
			return $firebaseArray(individualListingsRef);
		},

		getProfileBids: function(user_id) {
			var individualListingsRef = profileBidsRef.child(user_id);
			return $firebaseArray(individualListingsRef);
		},

		removeListing: function(listing_id, user_id, type, commodity_id, profilelisting_id) {
			console.log(listing_id);
			if (type=="offer"){
				console.log("sell");
				var individualListingsRef = marketListingSellRef.child(commodity_id).child(listing_id);
			}
			else {
				var individualListingsRef = marketListingBuyRef.child(commodity_id).child(listing_id);
				console.log("buy");
			}
			var deleteListing = $firebaseObject(individualListingsRef);
			deleteListing.$remove().then(function(){
				console.log(user_id);
				console.log(listing_id);
				var profileListingsRef = profileListingRef.child(user_id).child(profilelisting_id);
				var theListing = $firebaseObject(profileListingsRef);
				return theListing.$remove();	
			});
		
		},

	
	};




	Market.markets = $firebaseArray(marketRef);

	return Market;
});