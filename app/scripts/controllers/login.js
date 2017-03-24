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
    $User.signin({ email, password }).then((res) => {
      let { token, user } = res.data;
      let now = new Date();
      let expires = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
      $cookies.put('token', token, { expires });
      $cookies.putObject('user', { firstname: user.firstName, lastname: user.lastName }, { expires });
      $state.go('app.home');
    }, (error) => Toast.error({ details: { content: error.data.message } }));
  };
});
