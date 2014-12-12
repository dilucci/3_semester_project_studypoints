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
        $scope.nextId = 1;
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
        //
        //
        //    while(date <= lastDate) {
        //        //console.log("Date to array: " + date);
        //        $scope.newDate = {
        //            _id: new Date(date)
        //        };
        //        dateArray.push($scope.newDate);
        //        //dateIdArray.push($scope.newDate._id);
        //        //date.setDate(date.getDate()+1);
        //        date.setTime(date.getTime()+86400000);
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

            $scope.nextId++;
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

    .controller('SchedulePeriodCtrl', function ($scope, studentDetails, periodDetails, classDetails, $http) {
        console.log('SchedulePeriodCtrl!');
        $scope.period = periodDetails.getPeriod();
        console.log('isUser get Periods');

        $scope.getClassesForStudent = function(studentID){
            $http({
                method: 'GET',
                url: '/classes/student/'+studentID
            })
                .success(function (data, status, headers, config) {
                    $scope.classes = [];
                    var found = false;
                    data.forEach(function(classes){
                        found = false;
                        $scope.classes.forEach(function(thisClasses){
                            if(classes._id === thisClasses._id){
                                found = true;
                            }
                        });
                        if(found === false){
                            $scope.classes.push(classes);
                        }
                    });
                    console.log($scope.classes);
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        };

        $scope.showStudentsInClass = function (index) {
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

        $http({
            method: 'GET',
            url: 'adminApi/periods/'+$scope.period._id+'/classes'
        })
            .success(function (data, status, headers, config) {
                console.log("success!")
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
    })
