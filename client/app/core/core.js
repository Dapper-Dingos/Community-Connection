'use strict';

angular.module('theSignUp2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('core', {
        url: '/core',
        templateUrl: 'app/core/core.html',
        controller: 'CoreCtrl'
      });
  });