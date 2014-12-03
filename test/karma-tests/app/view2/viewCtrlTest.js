describe('myAppRename.users usersCtrl', function() {

  var scope, httpBackendMock, ctrl;
  var testResponse = {msg : "Test Message"};

  beforeEach(module('myAppRename.users'));

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    httpBackendMock = $httpBackend;
    httpBackendMock.expectGET('userApi/test').
      respond(testResponse);
    scope = $rootScope.$new();
    ctrl = $controller('usersCtrl', {$scope: scope});
  }));

  it('Should fetch two names ', function () {
    expect(scope.info).toBeUndefined();
    httpBackendMock.flush();
    expect(scope.info.msg).toEqual("Test Message");
  });

});