angular.module('myAppRename.controllers', []).
  controller('AppCtrl', function ($scope, $http, $window,$location) {

    function url_base64_decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }
    $scope.title = "Semester Project";
    $scope.username = "";
    $scope.isAuthenticated = false;
    $scope.isAdmin = false;
    $scope.isUser = false;
    $scope.message = '';
    $scope.error = null;

    $scope.submit = function () {
      console.log("POSTING!" + $scope.user);
      $http({
        method: 'POST',
        url: 'http://gruppe4.cloudapp.net/authenticate',
        data: $scope.user
      }).success(function(userData){
        $scope.profiles = userData;
        console.log(userData);
        console.log("id: " + userData[0]);
        console.log("username: " + userData[1]);
        console.log("role: " + userData[2]);
        $window.sessionStorage.setItem('token', userData.token);
        console.log("token: " + $window.sessionStorage.getItem('token'));
        $scope.isAuthenticated = true;
        $scope.username = userData[1];
        $scope.isAdmin = userData[2] == "admin";
        $scope.isUser = !$scope.isAdmin;
        $scope.error = null;
        console.log('DATA FROM JAVA-DB: ' + userData);
      })
      .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          $scope.isAuthenticated = false;
          $scope.error = 'You failed to login. Invalid User or Password';
          });;
      //$http
      //  .post('/authenticate', [$scope.user, $scope.profiles])
      //  .success(function (data, status, headers, config) {
      //    $window.sessionStorage.token = data.token;
      //      console.log($window.sessionStorage.token);
      //      console.log(data.token);
      //    $scope.isAuthenticated = true;
      //    var encodedProfile = data.token.split('.')[1];
      //    var profile = JSON.parse(url_base64_decode(encodedProfile));
      //    $scope.username = profile.username;
      //    $scope.isAdmin = profile.role == "admin";
      //    $scope.isUser = !$scope.isAdmin;
      //    $scope.error = null;
      //  })
      //  .error(function (data, status, headers, config) {
      //    // Erase the token if the user fails to log in
      //    delete $window.sessionStorage.token;
      //    $scope.isAuthenticated = false;
      //
      //    $scope.error = 'You failed to login. Invalid User or Password';
      //  });
    };

    $scope.logout = function () {
      $scope.isAuthenticated = false;
      $scope.isAdmin = false;
      $scope.isUser = false;
      delete $window.sessionStorage.token;
      $location.path("/home");
    }
  })

  .controller('MyCtrl2', function ($scope) {
    // write MyCtrl2 here
  });



