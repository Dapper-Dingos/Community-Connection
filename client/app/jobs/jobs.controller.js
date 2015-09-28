'use strict';

angular.module('theSignUp2App')
  .controller('JobsCtrl', function ($scope, $http, $cookieStore, $state, User, Auth, Profile, JobsFactory, Message) {
    $('.collapsible').collapsible({});
    $scope.filters = {};
    $scope.errors = {};
    $scope.jobs = []
    $scope.categories = ['Tutoring', 'Food Service', 'Handy Work']
    $scope.friends = {};
    $scope.geocoder;
    $scope.geocoder = new google.maps.Geocoder();

    $scope.usermsg = {};
    $scope.friends = [];
    $scope.currentUser = Auth.getCurrentUser();
    $scope.job = {byUserId: $scope.currentUser._id};
    $scope.createJobPressed = false;
    $scope.jobPosted = false;

    $scope.submit = function() {
        $scope.usermsg.fromUserId = $scope.currentUser._id;
        $scope.usermsg.title = '';
        Message.sendMessages($scope.usermsg)
                    .then(function(data){
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
    };



    JobsFactory.getJobs()
              .then(function(data){
                $scope.jobs = data
                $scope.jobFriends = []
                $scope.jobs.forEach(function(j) {
                  $scope.jobFriends.push(j.byUserId)
                })
                Message.getFriends($scope.jobFriends)
                  .then(function(data){
                      for (var i = 0; i < data.length; i++) {
                        $scope.friends[data[i]._id] = data[i].name
                      };
                  })
                  .catch(function(err){
                      $scope.errors.other = err.message;
                  })
              })
              .catch(function(err){
                $scope.errors.other = err.message;
              })

    $scope.createJob = function() {
      //geolocates and saves GPS coordinates of location provided
      var address = document.getElementById('address').value;
      $scope.geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
         $scope.job.latitude = results[0].geometry.location.H;
         $scope.job.longitude = results[0].geometry.location.L;
        } else {
          alert('Please enter a valid location');
        }
      $scope.job.picture = $scope.currentUser.profileInfo.profilePicUrl;
      $scope.job.username = $scope.currentUser.name;
      $scope.jobs.push($scope.job)
      Profile.createJob($scope.job)
        .then( function(data) {
          $scope.jobPosted = data;
          $scope.createJobPressed = false;
          $scope.job = {}
          JobsFactory.getJobs()
              .then(function(data){
                $scope.jobs = data
                $scope.jobsList = data;
                $scope.jobFriends = []
                $scope.jobs.forEach(function(j) {
                  $scope.jobFriends.push(j.byUserId)
                })
              $state.reload();
              })
              .catch(function(err){
                $scope.errors.other = err.message;
              })
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      })
    }
  });