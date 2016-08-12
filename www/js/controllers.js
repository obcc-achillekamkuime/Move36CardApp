//angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  //var user= null;
  var authProvider = 'basic';
  var authSettings = { 'remember': true };

  var details = {
        'email': 'kamkuimo4520@obcc.com',
        'password': 'secret'
  };

  

  function signupSuccess(newUser) {
    console.log('signup worked ok, here is the new user '+JSON.stringify(newUser));
  }

  function signupFailure(params) { alert("error user not signup!")}

  //Ionic.Auth.signup(details).then(signupSuccess, signupFailure); 

  // Ionic.Auth.login('basic', {remember:true}, details).then(function(newUser) {
  //     console.log('back ok from custom login, results are '+JSON.stringify(newUser));
  //     user = newUser;
  //     //store a custom prop
  //     user.set('lastLogin',new Date());
  //     user.save();
  // }, function(err) {
  //     console.log('error from custom '+JSON.stringify(err));
  // });

  Ionic.Auth.login(authProvider, authSettings, details)
    .then(signupSuccess, signupFailure);

  $ionicPlatform.ready(function() {  
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        alert(JSON.stringify(payload));
        console.log(notification, payload);
      },
    });

    var callback = function(data) {      
      console.log('Registered token:', data.token);
      push.saveToken(data);
       console.log(JSON.stringify(data));
    }

    push.register(callback);

    // $ionicPush.init({
    //   "debug": true,
    //   "onNotification": function(notification) {
    //     var payload = notification.payload;
    //     console.log(notification, payload);
    //   },
    //   "onRegister": function(data) {
    //     alert(JSON.stringify(data));
    //     $ionicPush.saveToken(data.token);
    //     console.log(data.token);
    //   }
    // });

    // $ionicPush.register();
  });
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
