var myApp = angular.module('myApp', []);

myApp.controller('myAppController', function($scope, $http){

	$scope.topSites;

	getTopSites = function(){
		$http.get("topspots.JSON").then(function(response){
			$scope.topSites = response.data;
			for (i in $scope.topSites){
				googleMapsURL = "https://www.google.com/maps?q=";
				googleMapsURL += $scope.topSites[i].location[0] + "," + $scope.topSites[i].location[1];
				$scope.topSites[i].link = googleMapsURL;
			}

			$('head').append('<script async defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGlrqrO_evftmLh-qieGpY9gKCKCYPBV0&callback=initMap"></script>');
		}, function(){});
	}

	

	initMap = function(){
		var myLatLng = {lat: 0, lng: 0};

		var map = new google.maps.Map(document.getElementById('map'),{
			zoom: 10,
			center: myLatLng
		});
		// create an empty string to hold instances of all marker objects.
		var marker = [];
		// all lat and lng values will be averaged.  the map center will be set to the average lat and lng.
		var getAverage = [];
		for (i in $scope.topSites){
			// create a location object with the lat and lng equal to that of spot.
			var lat = $scope.topSites[i].location[0];
			var lng = $scope.topSites[i].location[1];

			console.log("after lat lng defined")

			myLatLng = {lat: lat, lng: lng};
			
			getAverage.push(myLatLng);

			// populate the marker array.
			marker[i] = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: $scope.topSites[i].name
			});
		}

		// calculate the average location.
		var latSum = 0;
		var lngSum = 0;
		for (i in getAverage){
			latSum += getAverage[i].lat;
			lngSum += getAverage[i].lng;
		}
		var latAvg = latSum / (getAverage.length);
		var lngAvg = lngSum / (getAverage.length);
		map.setCenter(new google.maps.LatLng(latAvg, lngAvg));
	}	

	getTopSites();
});


