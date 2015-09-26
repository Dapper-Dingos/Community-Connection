'use strict';

angular.module('theSignUp2App')
  .factory('Profile', function Auth($location, $rootScope, $http, User, Auth, Job, $cookieStore, $q) {
    var currentUser = Auth.getCurrentUser();

    return {
      /**
       * get my jobs
       *
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      getMyJobs: function(callback) {
        var cb = callback || angular.noop;
        // **********************************//
        // This is using angulars $resource injector
        // to handle $http as a $promise
        // See user.service.js
        // **********************************//
        return Job.getMyJobs({ id: currentUser._id }, {
          userid: currentUser._id
        }, function() {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      showAll: function(callback) {
        var cb = callback || angular.noop;
        // **********************************//
        // This is using angulars $resource injector
        // to handle $http as a $promise
        // See user.service.js
        // **********************************//
        return User.showAll({ id: currentUser._id }, {
        }, function() {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      createJob: function(job, callback) {
        var cb = callback || angular.noop;
        // **********************************//
        // This is using angulars $resource injector
        // to handle $http as a $promise
        // See user.service.js
        // **********************************//
        return Job.createJob({ id: currentUser._id }, job,
          function() {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Update Profile Info
       *
       * @param  {JSON}   newProfileInfo
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      updateProfileInfo: function(newProfileInfo, callback) {
        var cb = callback || angular.noop;
        return User.updateProfileInfo({ id: currentUser._id }, {
          user: currentUser,
          newProfileInfo: newProfileInfo
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      }
    };
  });