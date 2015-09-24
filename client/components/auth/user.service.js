'use strict';

angular.module('theSignUp2App')
  // ********************************//
  // $resource is a high level $http
  // it handles $http.get and $http.post
  // but its more configurable
  // see https://docs.angularjs.org/api/ngResource/service/$resource
  // Specifically the section on "Returns"
  // -----------------------------------
  // A resource "class" object with methods for the default set of resource actions optionally extended with custom actions. The default set contains these actions:
  // { 'get':    {method:'GET'},
  //   'save':   {method:'POST'},
  //   'query':  {method:'GET', isArray:true},
  //   'remove': {method:'DELETE'},
  //   'delete': {method:'DELETE'} };
  // ********************************//
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      updateProfileInfo: {
        method: 'PUT',
        params: {
          controller:'updateprofileinfo'
        }
      },
      // updateProfileSkills: {
      //   method: 'PUT',
      //   params: {
      //     controller:'updateprofileskills'
      //   }
      // },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getFriends: {
        method: 'POST',
        isArray: true,
        params: {
          controller:'getfriends'
        }
      },
      showAll: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'showall'
        }
      }
	  });
  });
