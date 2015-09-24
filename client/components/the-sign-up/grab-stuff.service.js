'use strict';

// ********************************8 //
// This factory can be injected
// much like Auth and User into a
// controller. Giving access to functions
// like User.save(...) Auth.login(...)
// GrabStuff.someFunction(...)
// ----------------------------------
// We may want to consider scrapping
// the copy paste from auth.service.js
// and implementing a seperate factory
// for "Message" and "Service" similar to
// user.service.js or the "User" factory
// by doing this it may make more sense
// to manage later on.
//
// As we could do something like:
		// return $resource('/api/messages/:id/:controller')
		// AND/OR
		// return $resource('/api/services/:id/:controller')
// ------------------------------------
// ":id" and ":controller" are placeholders that get replaced
// by angular ... when submitted they would be replaced by
// the message/service :id and the controller it should go to
// on the server side.
// SEE: server/api/{message,service,user}/{index.js,*.controller.js}
// Credit Card Example: https://docs.angularjs.org/api/ngResource/service/$resource
// ********************************8 //


angular.module('theSignUp2App')
  .factory('GrabStuff', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      getServices: function(callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/api/services', {
          // email: user.email,
          // password: user.password
        }).
        success(function(data) {
          // $cookieStore.put('token', data.token);
          // currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          // this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      getMessages: function(callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/api/messages', {
          // email: user.email,
          // password: user.password
        }).
        success(function(data) {
          // $cookieStore.put('token', data.token);
          // currentUser = User.get();
          console.log('Received Messages:', data)
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          // this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        // ********************************//
        // This is using regular $http to
        // GrabStuff from the server
        // and returning a deferred promise $q.defer()
        // ********************************//
        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        // **********************************//
        // This is using angulars $resource injector
        // to handle $http as a $promise
        // See user.service.js
        // **********************************//
        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        // **********************************//
        // This is using angulars $resource injector
        // to handle $http as a $promise
        // See user.service.js
        // **********************************//
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
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

        console.log('grab-stuff.service.js: updateProfileInfo',newProfileInfo,'\nuser: ',currentUser)
        return User.updateProfileInfo({ id: currentUser._id }, {
          user: currentUser,
          newProfileInfo: newProfileInfo
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },



      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });