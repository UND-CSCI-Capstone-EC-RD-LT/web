'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:AdduserCtrl
 * @description
 * # AdduserCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('EditUserCtrl', function ($scope, editUser, $mdDialog, $Department, $User, Toast) {

	// Initializing Variables \\

    // editUser variable passed from calling controller
    console.log(editUser);
    $scope.edit = editUser;
    console.log($scope.edit);
    $scope.roles = [
    	{name: 'Admin'},
    	{name: 'Normal'},
    ];

    $scope.departments = [];

    // End Initializing Variables \\

    // Getting Initial Data \\

    $Department.getAll().then((res) => {
    	$scope.departments = res.data;
    });

    // End Getting Initial Data \\

    $scope.hide = () => {
      $mdDialog.hide();
    };

    $scope.cancel = () => {
      $mdDialog.cancel();
    };

    // Uses the $scope variable "new" to pass data to User provider
    $scope.editUser = () => {
    	if($scope.editUserForm.$valid) {
            $mdDialog.hide(true);
    		if($scope.password === $scope.password2) {
	    		$User.update($scope.edit.id, $scope.edit).then((res) => {
	    			// some kind of success message
		    	}, (error) => Toast.error({ details: { content: error.data.message } }));
	    	} else {
	    		// some kind of error on the password inputs
	    	}
    	}
	};

});