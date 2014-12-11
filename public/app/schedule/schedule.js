'use strict';

angular.module('myAppRename.schedule', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/schedule', {
            templateUrl: 'app/schedule/schedule.html',
            controller: 'ScheduleCtrl'
        })
            .when('/scheduleperiod', {
            templateUrl: 'app/schedule/scheduleperiod.html',
            controller: 'SchedulePeriodCtrl'
        });
    }])
    .controller('ScheduleCtrl', function ($scope, periodDetails, $http) {
        console.log("inde i ScheduleCtrl");
        console.log("isAutheticated: " + $scope.isAuthenticated);
        $scope.nextId = 3;
        $scope.periods = [];

        $scope.add = function () {
            $scope.newPeriod = {
                _id: $scope.nextId,
                period_name: $scope.newPeriodName,
                start_date: $scope.newStart,
                end_date: $scope.newEnd,
                max_points: $scope.newMaxPoints
            };
            console.log('inde i add period function');
            $http({
                method: 'POST',
                url: 'adminApi/periods',
                data: $scope.newPeriod
            }).success(function (data, status, headers, config) {
                console.log('SUCCESS!');
                $scope.periods.push($scope.newPeriod);
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

        if ($scope.isUser) {
            console.log('isUser get Periods');
            $http({
                method: 'GET',
                url: 'userApi/periods'
            })
                .success(function (data, status, headers, config) {
                    console.log("success!")
                    $scope.periods = data;
                    periodDetails.setPeriods(data);
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
        if ($scope.isAdmin) {
            console.log('isAdmin get Periods');
            $http({
                method: 'GET',
                url: 'adminApi/periods'
            })
                .success(function (data, status, headers, config) {
                    console.log("success!")
                    $scope.periods = data;
                    periodDetails.setPeriods(data);
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
        $scope.period_name = "";
        $scope.start_date = "";
        $scope.end_date = "";

        $scope.showDetails = function (index) {
            periodDetails.setPeriod(index);

            $scope.period_name = $scope.periods[index].period_name;
            $scope.start_date = $scope.periods[index].start_date;
            $scope.end_date = $scope.periods[index].end_date;
            console.log(JSON.stringify($scope.periods[index]))
            console.log("scope period:" + JSON.stringify(index))
            console.log("period name: " + $scope.period_name);
            console.log("period start_date: " + $scope.start_date);
            console.log("period end_date: " + $scope.end_date);
        };
        console.log("periods: " + $scope.periods)

    })
    .controller('SchedulePeriodCtrl', function ($scope, periodDetails) {
        console.log("Er nu inde i ScheduleperiodCtrl, svin");
        console.log("periodDetails " + periodDetails.getPeriods());
        $scope.period = periodDetails.getPeriod();
    });

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