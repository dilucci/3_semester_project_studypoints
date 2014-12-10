'use strict';

angular.module('myAppRename.schedule', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/schedule', {
      templateUrl: 'app/schedule/schedule.html',
      controller: 'ScheduleCtrl'
    });
  }])
  .controller('ScheduleCtrl', ['$scope', '$http', function ($scope, $http) {
      console.log("inde i ScheduleCtrl");
      $scope.add = function() {
        $scope.newPeriod = {periode_id: $scope.newPeriod, start_date: $scope.newStart, end_date: $scope.newEnd};
        $scope.cars.push($scope.newPeriod);
        $scope.newPeriod = "";
      }

      //$scope.abstract = false;
      //$scope.hoverIn = function(){
      //  this.abstract = true;
      //};
      //
      //$scope.hoverOut = function(){
      //  this.abstract = false;
      //};
    $http({
      method: 'GET',
      url: 'userApi/periods'
    })
      .success(function (data, status, headers, config) {
        console.log("success!")
        $scope.periods = data;
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

//function showHide(shID) {
//  if (document.getElementById(shID)) {
//    if (document.getElementById(shID+'-show').style.display != 'none') {
//      document.getElementById(shID+'-show').style.display = 'none';
//      document.getElementById(shID).style.display = 'block';
//    }
//    else {
//      document.getElementById(shID+'-show').style.display = 'inline';
//      document.getElementById(shID).style.display = 'none';
//    }
//  }
//}