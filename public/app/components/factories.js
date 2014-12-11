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
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
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
    });

app.factory('periodDetails', function(){
  var periods = [];
  var selectedPeriod = "";
  return {
    getPeriods: function(){
      return periods;
    },
    setPeriods: function(array){
      periods = array;
    },
    setPeriod: function(index){
      selectedPeriod = periods[index];
    },
    getPeriod: function(){
      return selectedPeriod;
    }
  }

});