'use strict';

/* Factories */

var app = angular.module('myAppRename.factories', []);

  app.factory('InfoFactory', function () {
    var info = "Hello World from a Factory";
    var getInfo = function getInfo(){
      return info;
    };
    return {
      getInfo: getInfo
    }
  });

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
  app.factory('adminDatabase', function($http){
    var getStudents = function(callback){
      $http.get('adminApi/students')
          .success(function(data){
            callback(null, data);
          })
          .error(function(err){
            callback(err);
          })
        };
    var getClasses = function(callback){
      $http.get('adminApi/classes')
          .success(function(data){
            callback(null, data);
          })
          .error(function(err){
            callback(err);
          })
    };
    var getPeriods = function(callback){
      $http.get('adminApi/periods')
          .success(function(data){
            callback(null, data);
          })
          .error(function(err){
            callback(err);
          })
    };
      var getPeriodDays = function(periodId, callback){
          $http.get('adminApi/periodDays/' + periodId)
              .success(function(data){
                  callback(null, data);
              })
              .error(function(err){
                  callback(err);
              })
      };
      var getStudentsInDay = function(day, callback){
          $http.get('adminApi/students/day/' + day)
              .success(function(data){
                  callback(null, data);
              })
              .error(function(err){
                  callback(err);
              })
      };
    var getTeachers = function(callback){
      $http.get('adminApi/teachers')
          .success(function(data){
            callback(null, data);
          })
          .error(function(err){
            callback(err);
          })
    };

    return{
      getStudents: getStudents,
      getClasses: getClasses,
      getPeriods: getPeriods,
      getPeriodDays: getPeriodDays,
      getTeachers: getTeachers,
      getStudentsInDay: getStudentsInDay,
    }
    });

app.factory('studentDetails', function(){
    var students = [];
    var selectedStudent = "";
    return {
        getStudents: function(){
            return students;
        },
        setStudents: function(array){
            students = array;
        },
        setStudent: function(index){
            selectedStudent = students[index];
        },
        getStudent: function(){
            return selectedStudent;
        }
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

app.factory('classDetails', function(){
    var classes = [];
    var selectedClass = "";
    return {
        getClasses: function(){
            return classes;
        },
        setClasses: function(array){
            classes = array;
        },
        setClass: function(index){
            selectedClass = classes[index];
        },
        getClass: function(){
            return selectedClass;
        }
    }
});