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
    .controller('ScheduleCtrl', function ($scope, periodDetails, adminDatabase, $http) {
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
            adminDatabase.getPeriods(function(err, periods){
                $scope.periods = periods;
                periodDetails.setPeriods(periods);
                adminDatabase.getClasses(function(err, classes){
                    $scope.classes = classes;
                    adminDatabase.getStudents(function(err, students){
                        $scope.students = students;
                        console.log("periods: " + $scope.periods);
                        console.log("classes: " + JSON.stringify($scope.classes));
                        console.log("students: " + $scope.students);
                    })
                })
            })


            //console.log('isAdmin get Periods');
            //$http({
            //    method: 'GET',
            //    url: 'adminApi/periods'
            //})
            //    .success(function (data, status, headers, config) {
            //        console.log("success!")
            //        $scope.periods = data;
            //        periodDetails.setPeriods(data);
            //        $scope.error = null;
            //    }).
            //    error(function (data, status, headers, config) {
            //        if (status == 401) {
            //            $scope.error = "You are not authenticated to request these data";
            //            return;
            //        }
            //        $scope.error = data;
            //    });
        }

        $scope.showDetails = function (index) {
            periodDetails.setPeriod(index);
        };
    })

    .controller('SchedulePeriodCtrl', function ($scope, periodDetails, adminDatabase, $http) {
        console.log('SchedulePeriodCtrl!');
        $scope.period = periodDetails.getPeriod();
        console.log('isUser get Periods');
        $http({
            method: 'GET',
            url: 'adminApi/periods/'+$scope.period._id+'/classes'
        })
            .success(function (data, status, headers, config) {
                console.log("success!")
                $scope.classes = data;
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