'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('UsersCtrl', function ($scope, $mdDialog, $User) {
	
	// Initializing Variables \\

	$scope.users = []

	$scope.showDelete = false;

	// Initializing Variables \\

	// Getting Initial Data \\

	$User.getAll().then((res) => {
		console.log(res.data);
		$scope.users = res.data;
	}, (error) => Toast.error({ details: { content: error.data.message } }));

	// End Getting Initial Data \\

	$scope.toggleDelete = () => {
		for (var i = 0; i < $scope.users.length; i++) {
			if($scope.users[i].selected) {
				$scope.showDelete = true;
				return;
			}
		}
		$scope.showDelete = false;
	}

	$scope.showAddUser = function(ev) {
	    $mdDialog.show({
			controller: 'AddUserCtrl',
			templateUrl: './views/adduser.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: false // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      	// success toast/message for adding user
	    }, function() {
	      	$scope.status = 'You cancelled the dialog.';
	    });
	};

	$scope.showEditUser = function(user, ev) {
	    $mdDialog.show({
	    	locals: {editUser: user},
			controller: 'EditUserCtrl',
			templateUrl: './views/edituser.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: false // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      	// success toast/message for editing user
	    }, function() {
	      	$scope.status = 'You cancelled the dialog.';
	    });
	};

	$scope.showConfirmDelete = function(ev) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title('Delete Selected Users')
	          .textContent('Are you sure you want to delete the selected users?')
	          .ariaLabel('Delete Selected Users')
	          .targetEvent(ev)
	          .ok('Yes')
	          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	// run delete code here
	    }, function() {
	     	// do nothing, user cancelled action
	    });
  	};

});
