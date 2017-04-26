'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp')
  .controller('MainCtrl', function ($scope, $state, $cookies, $User, Auth, Toast) {
    $scope.user = $cookies.getObject('user');
    $scope.edit = Object.assign({}, $scope.user);
    $scope.openMenu = ($mdMenu, ev) => $mdMenu.open(ev);
    $scope.profile = () => $state.go('app.profile');
    $scope.logout = () => {
      Auth.delete();
      $state.go('login');
    };
    $scope.save = () => {
      let different = false;
      for (let i in $scope.edit) {
        if ($scope.user[i] && $scope.user[i] !== $scope.edit[i]) {
          different = !different;
          break;
        }
      }

      if (different || $scope.edit.password) {
        $User.update($scope.user.id, $scope.edit).then((res) => {
          Auth.updateUser(res.data);
          $scope.user = res.data;
          $scope.edit = Object.assign({}, $scope.user);
          Toast.success();
        }, (error) => {
          Toast.error({ details: { content: error.data.message } });
        });
      }
    }
  });
