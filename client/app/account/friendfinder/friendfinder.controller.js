'use strict';

angular.module('theSignUp2App')
  .controller('FriendFinderCtrl', function ($scope, $window, $http, $cookieStore, User, Auth, Profile, Upload, $state) {
    $scope.errors = {};
    $scope.users = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.allUsers = [];
    $scope.addFriend = function(friend){
        $scope.currentUser.friends.push(friend._id)
        User.save($scope.currentUser, function(){
            console.log(arguments)
        })
    }
    Profile.showAll()
        .then(function(data){
            data.forEach(function(friend, id){
                if ($scope.currentUser.friends.indexOf(friend._id) == -1){
                    $scope.allUsers.push(friend)
                }

            })
            //$scope.allUsers = data
        })
        .catch(function(err){
            $scope.errors.other = err.message;
        })
  });
