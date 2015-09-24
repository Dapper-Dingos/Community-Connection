'use strict';

angular.module('theSignUp2App')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    // TODO: complete services view
    // {
    //   'title': 'services',
    //   'link': '/services'
    // }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      console.log('logging out')
      Auth.logout();
      $location.path('/'); //#DD: Changed from '/login' to '/'
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });