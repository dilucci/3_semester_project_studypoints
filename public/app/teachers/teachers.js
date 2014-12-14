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
    console.log("inde i TeacherCtrl");
      $scope.add = function () {
        //var periodDayIds = generateDays($scope.newStart, $scope.newEnd);
        //console.log('periodDayIds: ' + periodDayIds);
        $scope.newStudent = {
          username: $scope.newUserName,
          first_name: $scope.newFirstName,
          last_name: $scope.newLastName,
          address: $scope.newAddress,
          phone: $scope.newPhone,
          email: $scope.newEmail
        };
        console.log('inde i add period function');
        $http({
          method: 'POST',
          url: 'adminApi/students',
          data: $scope.newStudent
        }).success(function (data, status, headers, config) {
          console.log('SUCCESS!');
          $scope.error = null;
        }).
            error(function (data, status, headers, config) {
              if (status == 401) {
                $scope.error = "You are not authenticated to request these data";
                return;
              }
              $scope.error = data;
            });
        $scope.newStudent = "";
      };
});



