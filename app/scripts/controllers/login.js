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
      var now = new Date();
      var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      $cookies.put('token', token, {
        expires: tomorrow
      });
      $cookies.put('user', JSON.stringify({ firstname: user.firstName, lastname: user.lastName }), {
        expires: tomorrow
      });
      $state.go('app.home');
    }, function (error) {
      Toast.error({
        content: { details: { error } }
      });
    });
  }
});
