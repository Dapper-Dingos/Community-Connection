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
        console.log('profile.service.js: getMyJobs: currentUser._id', currentUser._id)
        return Job.getMyJobs({ id: currentUser._id }, {
          userid: currentUser._id
        }, function() {
          console.log('profile.service.js: getMyJobs: success callback', arguments)
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
        console.log('profile.service.js: showAll: currentUser._id', currentUser._id)
        return User.showAll({ id: currentUser._id }, {
        }, function() {
          console.log('profile.service.js: showAll: success callback', arguments)
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
        console.log('profile.service.js: createJob: job', job)
        return Job.createJob({ id: currentUser._id }, job,
          function() {
          console.log('profile.service.js: createJob: success callback', arguments)
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

        console.log('profile.service.js: updateProfileInfo',newProfileInfo,'\nuser: ',currentUser)
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