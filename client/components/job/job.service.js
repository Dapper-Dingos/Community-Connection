'use strict';
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
angular.module('theSignUp2App')
  .factory('Job', function ($resource) {
    return $resource('/api/jobs/:id/:controller', {
      id: '@_id'
    },
    {
      getMyJobs: {
        method: 'GET',
        isArray:true,
        params: {
          controller:'getmyjobs'
        }
      },
      createJob: {
        method: 'POST',
        params: {
          controller:'createjob'
        }
      }
    });
  });
