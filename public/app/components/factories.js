'use strict';

/* Factories */

var app = angular.module('myAppRename.factories', []);

  app.factory('InfoFactory', function () {
    var info = "Hello World from a Factory";
    var getInfo = function getInfo(){
      return info;
    }
    return {
      getInfo: getInfo
    }
  })

  app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          console.log('sessionToken true');
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          console.log("config: " + JSON.stringify(config));
        }
        return config;
      },
      responseError: function (rejection) {
        console.log('rejection: ' + JSON.stringify(rejection));
        if (rejection.status === 401) {
          console.log('REJECTED BITCH');
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    };
  });
  app.factory('authProfiles', function($http){
    var getProfiles = function(callback){
      $http.get('http://gruppe4.cloudapp.net/Profiles')
          .success(function(data){
            callback(null, data);
          })
          .error(function(err){
            callback(err);
          })
      };
    return{
      getProfiles: getProfiles
    }
    })
;