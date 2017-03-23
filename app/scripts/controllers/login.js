'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('LoginCtrl', function ($scope, $state, $cookies, $User, Toast) {
  $scope.login = (email, password) => {
    $User.signin(email, password).then(function (res) {
      var token = res.data.token;
      var user = res.data.user;
      $cookies.put('token', token);
      $state.go('app.home');
    }, function (error) {
      //Toast.error({ content: Error.show(error) });
      Toast.error({ content: error });
    });
  }
});
