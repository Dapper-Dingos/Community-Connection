'use strict';

angular.module('theSignUp2App')
  .controller('MessagesCtrl', function ($scope, User, Auth, Message) {
    $scope.errors = {};
    $scope.message = [];
    $scope.lastmessages = [];
    $scope.usermsg = {};
    $scope.friends = [];
    $scope.currentUser = Auth.getCurrentUser();
    console.log('current User', $scope.currentUser);
    $scope.messages = [];
    $scope.updateToFriend = function (friendId) {
        $scope.usermsg.toUserId = friendId;
        console.log(arguments);
    }
    $scope.submit = function() {
        $scope.usermsg.fromUserId = $scope.currentUser._id;
        $scope.usermsg.title = '';
        Message.sendMessages($scope.usermsg)
                    .then(function(data){
                        console.log("Success")
                        console.log('send data', data)
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
        console.log("YES!")
    };
    //     fromUserID:,
    //     toUserID:,
    //     title:  'Hello BOB',
    //     author: 'userIDhere',
    //     body:   'this is the message',
    //     comments: [{ body: 'this is a comment', date: Date() }],
    //     date: { type: Date, default: Date.now() },
    //     hidden: false
    //   };
	Message.getMessages()
    				.then(function(data){
    					$scope.messages = data
                        console.log('getData', data)
    				})
    				.catch(function(err){
    					$scope.errors.other = err.message;
    				})
    console.log($scope.currentUser.lastMessages)
    console.log('friends',$scope.currentUser.friends)

    Message.getFriends(null)
                    .then(function(data){
                        $scope.friends = data
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
    console.log('FRIENDS',$scope.friends)
    Message.lastMessages($scope.currentUser.friends, $scope.currentUser._id)
                    .then(function(data){
                        $scope.lastmessages = data
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
                    console.log('messages.controlller.js: lastMessages: ',$scope.lastmessages)

    
	});