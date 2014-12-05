'use strict';

// Declare app level module which depends on views, and components
angular.module('myAppRename', [
  'ngRoute',
  'myAppRename.controllers',
  'myAppRename.directives',
  'myAppRename.services',
  'myAppRename.factories',
  'myAppRename.filters',
  'myAppRename.home',
  'myAppRename.students',
  'myAppRename.teachers',
  'myAppRename.profiles',
  'myAppRename.mypage'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });



