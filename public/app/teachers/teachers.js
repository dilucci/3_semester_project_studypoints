'use strict';

angular.module('myAppRename.teachers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teachers', {
    templateUrl: 'app/teachers/teachers.html',
    controller: 'teachersCtrl'
  }).when('/teachermarking', {
    templateUrl: 'app/teachers/teachermarking.html',
    controller: 'teachersCtrl'
  }).when('/teacherchangestudent', {
    templateUrl: 'app/teachers/teacherchangestudent.html',
    controller: 'teachersCtrl'
  }).when('/teacheraddstudent', {
    templateUrl: 'app/teachers/teacheraddstudent.html',
    controller: 'teachersCtrl'
  });

}])

.controller('teachersCtrl', function ($scope, $http) {
    console.log("inde i TeacherCtrl")
    $scope.searchStudent ="";
});



