'use strict';

angular.module('theSignUp2App')

  .controller('mapsController', function ($scope, $log, $timeout, JobsFactory) {
    $scope.map = {center: {latitude: 30.2500, longitude: 97.7500}, zoom: 12 };
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.message = 'Its working!!!!';
    $scope.geocoder;
    $scope.infowindow = new google.maps.InfoWindow();
    $scope.jobsList;
    $scope.marker = {
      id: 0,
      show: false,
      };
      
    //function for taking 
	$scope.codeAddress = function() {
	  var address = document.getElementById('address').value;
	  $scope.geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
	    //geolocating function
	   var onSuccess = function(position) {
	    $scope.map.center = {
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude
	    };
	    $scope.$apply();
	}
	function onError(error) {
	    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);




	 $scope.windowOptions = {
            show: false
        };

	 $scope.closeClick = function() {
            $scope.windowOptions.show = !$scope.windowOptions.show;
        };

	$scope.markerJobs = function(){
		JobsFactory.getJobs()
              .then(function(data){
              	data.forEach(function(job){
              	job.coords = {
              		latitude: job.latitude,
              		longitude: job.longitude
              	}
              })
                $scope.jobsList = data;
			})
	}

	$scope.$on('jobSubmit', function(event) {
		$scope.markerJobs();
	})

	$scope.markerJobs();



	$scope.jobTracker = function(job){
	}


});