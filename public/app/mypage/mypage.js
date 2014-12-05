'use strict';

angular.module('myAppRename.mypage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mypage', {
            templateUrl: 'app/mypage/mypage.html',
            controller: 'mypageCtrl'
        });
    }])
    .controller('mypageCtrl', ['$scope', '$http', function ($scope, $http) {
        console.log("inde i mypageCtrl")

        $http({
            method: 'GET',
            url: 'userApi/students/' + $scope.username
        })
            .success(function (studentArray, status, headers, config) {
                console.log("success!")
                $scope.student = studentArray[0];
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "Could not retrieve user data from database.";
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
