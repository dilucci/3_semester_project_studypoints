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
        $scope.periods = [];

        //var generateDays = function (startDate, endDate){
        //    console.log("Inside generateDays()");
        //    var date = new Date(startDate);
        //    console.log('date ' + date);
        //    var lastDate = new Date(endDate);
        //    console.log('lastDate: '  + lastDate);
        //
        //    var dateArray = [];
        //    var dateIdArray = [];
        //    var nextId = date.toISOString().substring(0,10);
        //
        //
        //
        //    while(date <= lastDate) {
        //        //console.log("Date to array: " + date);
        //        $scope.newDate = {
        //            _id: nextId,
        //            day: new Date(date)
        //        };
        //        dateArray.push($scope.newDate);
        //        //dateIdArray.push($scope.newDate._id);
        //        //date.setDate(date.getDate()+1);
        //        date.setTime(date.getTime() +86400000);
        //        nextId = date.toISOString().substring(0,10);
        //
        //    }
        //    $http({
        //        method: 'POST',
        //        url: 'adminApi/days',
        //        data: dateArray
        //    }).success(function (data, status, headers, config) {
        //        console.log('SUCCESS!');
        //        return dateIdArray;
        //        $scope.error = null;
        //    }).
        //        error(function (data, status, headers, config) {
        //            if (status == 401) {
        //                $scope.error = "You are not authenticated to request these data";
        //                return;
        //            }
        //            $scope.error = data;
        //        });
        //};

        $scope.add = function () {
            //var periodDayIds = generateDays($scope.newStart, $scope.newEnd);
            //console.log('periodDayIds: ' + periodDayIds);
            $scope.newPeriod = {
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
                $scope.periods.push(data);
                $scope.error = null;
            }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
            $scope.newPeriod = "";
        };

        adminDatabase.getPeriods(function(err, periods){
            $scope.periods = periods;
            periodDetails.setPeriods(periods);
            console.log("periods: " + $scope.periods);
        });

        $scope.showDetails = function (index) {
            periodDetails.setPeriod(index);
        };
    })

    .controller('SchedulePeriodCtrl', function ($scope, studentDetails, periodDetails, adminDatabase, classDetails, $http) {
        console.log('SchedulePeriodCtrl!');
        $scope.period = periodDetails.getPeriod();

        $scope.daysInPeriod = [];
        $scope.classes = [];
        $scope.availableClasses = [];
        $scope.class = {};
        $scope.attendenceDisplay = false;
        $scope.datePicked = "";
        $scope.$watch('datePicked', function(){
            adminDatabase.getPeriodDays($scope.period._id, function(error, days){
                $scope.daysInPeriod = days;
                console.log("daysINPeiordd: " + days)
            });
            $scope.attendenceDisplay=false
        });



        $http({
            method: 'GET',
            url: 'adminApi/periods/'+$scope.period._id+'/classes'
        })
            .success(function (data, status, headers, config) {
                console.log("success!");
                adminDatabase.getClasses(function(err, classes){
                    $scope.availableClasses = classes;
                    console.log('classes: ' + JSON.stringify($scope.availableClasses))
                    adminDatabase.getPeriodDays($scope.period._id, function(err, periods){
                        $scope.periodDays = periods;
                    });
                });
                $scope.classes = data;
                classDetails.setClasses(data);
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });


        $scope.addClassToPeriod = function () {
            $http({
                method: 'PUT',
                url: 'adminApi/periods/'+$scope.period._id+'/classes',
                data: $scope.class
            })
                .success(function (data, status, headers, config) {
                    console.log("success!");
                    $scope.classes.push(data);
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };

        $scope.showStudentsInClass = function (index) {
            $scope.attendenceDisplay = true;
            classDetails.setClass(index);
            $http({
                method: 'GET',
                url: 'adminApi/students/class/'+classDetails.getClass()._id
            })
                .success(function (data, status, headers, config) {
                    console.log("success!")
                    $scope.students = data;
                    studentDetails.setStudents(data);
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };

        $scope.showStudentDetails = function (index) {
            studentDetails.setStudent(index);
            $scope.student = studentDetails.getStudent();
        };
    });
