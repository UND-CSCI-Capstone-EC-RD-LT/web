'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('UsersCtrl', function ($scope, $mdDialog, $User, Toast) {

	// Initializing Variables \\

	$scope.users = []

	$scope.showDelete = false;

	// Initializing Variables \\

	// Getting Initial Data \\
	let load; //Initialize the load variable
	(load = () => { // Set the load varibale to its function and run on init
		console.log('load');
		$User.getAll().then((res) => {
			$scope.users = res.data.filter((user) => user.id != $scope.user.id); //Remove Self from user list
		}, (error) => Toast.error({ details: { content: error.data.message } }));
	})();

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
				load();
				Toast.success();
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
				load();
				Toast.success();
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
	          .cancel('Cancel')
	          .ok('Delete');

	    $mdDialog.show(confirm).then(function() {
				let selected = $scope.users.filter((user) => user.selected); //Filter for only selected Users from list
				Promise.all(selected.map((item) => $User.delete(item.id))).then((res) => { //Wait for all Promises to finished then reload data and toast
					load();
					Toast.success();
				});
	    }, function() {
	     	// do nothing, user cancelled action
	    });
  	};

});
