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

	// Initializing Variables \\

	// Getting Initial Data \\

	$User.getAll().then((res) => {
		console.log(res.data);
		$scope.users = res.data;
	}, (error) => Toast.error({ details: { content: error.data.message } }));

	// End Getting Initial Data \\

	$scope.showAddUser = function(ev) {
	    $mdDialog.show({
			controller: 'AddUserCtrl',
			templateUrl: './views/adduser.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: false // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      	$scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      	$scope.status = 'You cancelled the dialog.';
	    });
	};

	function DialogController($scope, $mdDialog) {
	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.answer = function(answer) {
	      $mdDialog.hide(answer);
	    };
	}

});
