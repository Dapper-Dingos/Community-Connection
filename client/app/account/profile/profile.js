'use strict';

angular.module('theSignUp2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl'
        // resolve: {
        //   'currentUserData': function (Auth) {
        //     return Auth.getCurrentUser().$promise;
        //   }
        // },
           // authenticate: true
      });
  });