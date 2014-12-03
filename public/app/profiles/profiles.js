'use strict';

angular.module('myAppRename.profiles', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profiles', {
            templateUrl: 'app/profiles/profiles.html',
            controller: 'profilesCtrl'
        });
    }])
    .controller('profilesCtrl', function($scope, authProfiles) {
        authProfiles.getProfiles(function(err, data){
            $scope.profiles = data;
            })
        });