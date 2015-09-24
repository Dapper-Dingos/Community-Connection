'use strict';

angular.module('theSignUp2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        templateUrl: 'app/jobs/jobs.html',
        controller: 'JobsCtrl'
      })
      .state('jobSearch', {
        url: '/jobSearch',
        templateUrl: 'app/jobs/jobSearch.html',
        controller: 'JobsCtrl'
      })
  });