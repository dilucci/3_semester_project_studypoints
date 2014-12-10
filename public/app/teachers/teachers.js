'use strict';

angular.module('myAppRename.teachers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teachers', {
    templateUrl: 'app/teachers/teachers.html',
    controller: 'teachersCtrl'
  });
  $routeProvider.when('/teachermarking', {
    templateUrl: 'app/teachers/teachermarking.html',
    controller: 'teachersCtrl'
  });
  $routeProvider.when('/teacherchangestudent', {
    templateUrl: 'app/teachers/teacherchangestudent.html',
    controller: 'teachersCtrl'
  });
  $routeProvider.when('/teacheraddstudent', {
    templateUrl: 'app/teachers/teacheraddstudent.html',
    controller: 'teachersCtrl'
  });

}])

.controller('teachersCtrl', function ($scope, $http) {
    console.log("inde i TeacherCtrl")
    $scope.searchStudent ="";
    //$http({
    //  method: 'GET',
    //  url: 'adminApi/user'
    //}).
    //  success(function (data, status, headers, config) {
    //    $scope.users = data;
    //     $scope.error = null;
    //  }).
    //  error(function (data, status, headers, config) {
    //    if(status == 401){
    //      $scope.error ="You are not authenticated to request these data";
    //        return;
    //    }
    //    $scope.error = data;
    //  });
      $http({
        method: 'GET',
        url: 'userApi/schedule' + $scope.searchStudent
      })
          .success(function (data, status, headers, config) {
            console.log("success!")
            $scope.students = data;
            $scope.error = null;
          }).
          error(function (data, status, headers, config) {
            if (status == 401) {
              $scope.error = "You are not authenticated to request these data";
              return;
            }
            $scope.error = data;
          });
});



