'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('LoginCtrl', function ($scope, $state, $cookies, $User, Toast) {
  $scope.login = function (email, password) {
    $User.signin(email, password).then(function (res) {
      var token = res.data.token;
      var user = res.data.user;
      $cookies.put('token', token);
      $cookies.put('user', JSON.stringify({ firstname: user.firstName, lastname: user.lastName }));
      $state.go('app.home');
    }, function (error) {
      Toast.error({
        content: { details: { error } }
      });
    });
  }
});
