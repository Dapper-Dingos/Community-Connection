'use strict';

angular.module('theSignUp2App')
  .controller('MessagesCtrl', function ($scope, User, Auth, Message) {
    $scope.errors = {};
    $scope.message = [];
    $scope.lastmessages = [];
    $scope.usermsg = {};
    $scope.friends = [];
    $scope.currentUser = Auth.getCurrentUser();
    $scope.messages = [];
    $scope.updateToFriend = function (friendId) {
        $scope.usermsg.toUserId = friendId;
    }
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
	Message.getMessages()
    				.then(function(data){
    					$scope.messages = data
    				})
    				.catch(function(err){
    					$scope.errors.other = err.message;
    				})
    Message.getFriends(null)
                    .then(function(data){
                        $scope.friends = data
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
    Message.lastMessages($scope.currentUser.friends, $scope.currentUser._id)
                    .then(function(data){
                        $scope.lastmessages = data
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
	});