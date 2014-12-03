'use strict';

angular.module('myAppRename.users', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/users', {
      templateUrl: 'app/users/users.html',
      controller: 'UsersCtrl'
    });
  }])
  .controller('UsersCtrl', ['$scope', '$http', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'userApi/test'
    })
      .success(function (data, status, headers, config) {
        $scope.info = data;
        $scope.error = null;
      }).
      error(function (data, status, headers, config) {
        if (status == 401) {
          $scope.error = "You are not authenticated to request these data";
          return;
        }
        $scope.error = data;
      });
  }]);

/*
function toggleTable() {
  var lTable = document.getElementById("periodetable");
  lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
};*/

function showHide(shID) {
  if (document.getElementById(shID)) {
    if (document.getElementById(shID+'-show').style.display != 'none') {
      document.getElementById(shID+'-show').style.display = 'none';
      document.getElementById(shID).style.display = 'block';
    }
    else {
      document.getElementById(shID+'-show').style.display = 'inline';
      document.getElementById(shID).style.display = 'none';
    }
  }
}