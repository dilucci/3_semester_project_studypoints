'use strict';

angular.module('myAppRename.teachers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teachers', {
    templateUrl: 'app/teachers/teachers.html',
    controller: 'teachersCtrl'
  });
}])

.controller('teachersCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'adminApi/user'
    }).
      success(function (data, status, headers, config) {
        $scope.users = data;
         $scope.error = null;
      }).
      error(function (data, status, headers, config) {
        if(status == 401){
          $scope.error ="You are not authenticated to request these data";
            return;
        }
        $scope.error = data;
      });
});



