'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp')
  .controller('LoginCtrl', function ($scope, $state, $cookies, Toast) {
    $scope.login = (email, password) => {
      if (email == 'test@test.com' && password == 'test') {
        $cookies.put('good', true);
        $state.go('app.home');
      } else {
        Toast.error({
          details: {
            content: 'Invalid Account Information'
          }
        });
      }
    };
  });
