'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp')
  .controller('MainCtrl', function ($scope, $state, $cookies) {
    $scope.user = $cookies.getObject('user');

    $scope.openMenu = ($mdMenu, ev) => $mdMenu.open(ev);
    $scope.profile = () => $state.go('app.profile');
    $scope.logout = () => {
      for (var key in $cookies.getAll()) { $cookies.remove(key); }
      $state.go('login');
    };
  });
