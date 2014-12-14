'use strict';

angular.module('myAppRename.mypage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mypage', {
            templateUrl: 'app/mypage/mypage.html',
            controller: 'mypageCtrl'
        });
    }])
    .controller('mypageCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.error = null;
        $scope.changePassword = function () {
            console.log('user.password: ' + $scope.user.password);
            console.log('oldpw: ' + $scope.oldPassword);
            console.log('newpw: ' + $scope.newPassword);
            if($scope.oldPassword === $scope.user.password && $scope.newPassword === $scope.confirmPassword){
                console.log("POSTING NEW PASSWORD!");
                $scope.user.password = $scope.newPassword;
                console.log('user new pass: ' +  $scope.user.password);
                $http
                    .post('/changepw', $scope.user)
                    .success(function (data, status, headers, config) {
                        console.log("success!");
                        $scope.oldPassword = "";
                        $scope.newPassword = "";
                        $scope.confirmPassword = "";
                        $scope.user.password="";
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
            else{
                $scope.error = 'Something went wrong!';
            }
        };
    }]);

/*
 function toggleTable() {
 var lTable = document.getElementById("periodetable");
 lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
 };*/
