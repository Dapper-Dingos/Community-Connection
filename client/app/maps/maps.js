'use strict';

angular.module('theSignUp2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('maps', {
        url: '/maps',
        templateUrl: 'app/maps/maps.html',
        controller: 'mapsController'
      });
  });
