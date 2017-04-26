'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('LoginCtrl', function ($scope, $state, $cookies, $User, Toast, Auth) {
  $scope.login = (email, password) => {
    $User.signin({ email, password }).then((res) => {
      let { token, user } = res.data;
      Auth.set(token, user);
      $state.go('app.home');
    }, (error) => Toast.error({ details: { content: error.data.message } }));
  };
});
