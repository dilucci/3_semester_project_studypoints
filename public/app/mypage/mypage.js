'use strict';

angular.module('myAppRename.mypage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mypage', {
            templateUrl: 'app/mypage/mypage.html',
            controller: 'mypageCtrl'
        });
    }])
    .controller('mypageCtrl', ['$scope', '$http', function ($scope, $http) {
        //console.log("inde i mypageCtrl")


    }]);

/*
 function toggleTable() {
 var lTable = document.getElementById("periodetable");
 lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
 };*/
