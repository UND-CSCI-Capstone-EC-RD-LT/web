'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:AdduserCtrl
 * @description
 * # AdduserCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('AddUserCtrl', function ($scope, $mdDialog, $Department, $User, Toast) {

  // Initializing Variables \\
  console.log('add user');
  $scope.new = {
    username: '',
    password: '',
    password2: '',
    email: '',
    firstName: '',
    lastName: '',
    department: 0,
    role: '',
  };

  $scope.roles = [
    { name: 'Admin' },
    { name: 'Normal' },
  ];

  $scope.departments = [];

  // End Initializing Variables \\

  // Getting Initial Data \\

  $Department.getAll().then((res) => $scope.departments = res.data);

  // End Getting Initial Data \\

  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  // Uses the $scope variable "new" to pass data to User provider
  $scope.add = () => {
    if ($scope.addUserForm.$valid) {
      $mdDialog.hide(true);
      if ($scope.password === $scope.password2) {
        $User.signup($scope.new).then((res) => {
          // some kind of success message
        }, (error) => Toast.error({ details: { content: error.data.message } }));
      } else {
        // some kind of error on the password inputs
      }
    }
  };

});
