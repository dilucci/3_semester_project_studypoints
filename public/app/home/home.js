'use strict';

angular.module('myAppRename.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'app/home/home.html'
  });
}])

.controller('View1Ctrl', function() {
});