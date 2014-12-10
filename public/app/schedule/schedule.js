'use strict';

angular.module('myAppRename.schedule', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/schedule', {
      templateUrl: 'app/schedule/schedule.html',
      controller: 'ScheduleCtrl'
    });
    $routeProvider.when('/scheduleperiod', {
      templateUrl: 'app/schedule/scheduleperiod.html',
      controller: 'ScheduleCtrl'
    });
  }])
  .controller('ScheduleCtrl', ['$scope', '$http', function ($scope, $http) {
      console.log("inde i ScheduleCtrl");
      console.log("isAutheticated: " + $scope.isAuthenticated);
      $scope.nextId = 3;
      $scope.add = function() {
      $scope.newPeriod = {_id: $scope.nextId, period_name: $scope.newPeriodName, start_date: $scope.newStart, end_date: $scope.newEnd, max_points: $scope.newMaxPoints};

      $http({
          method: 'POST',
          url: 'adminApi/periods',
          data: $scope.newPeriod
      }).success(function (data, status, headers, config) {
          $scope.error = null;
      }).
          error(function (data, status, headers, config) {
              if (status == 401) {
                  $scope.error = "You are not authenticated to request these data";
                  return;
              }
              $scope.error = data;
          });
        $scope.nextId++;
        $scope.newPeriod = "";

      };
      if($scope.isUser){
          console.log('isUser get Periods');
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
      }
      if($scope.isAdmin){
          console.log('isAdmin get Periods');
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
        }

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