'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('ItemCtrl', function ($scope, $stateParams, $timeout, $Item, $ItemType, $Department, $Building, $Room, Toast) {

	console.log($stateParams.id);

	$scope.item = {};
	$scope.itemCopy = {};

	$scope.showEdit	= false;

	$scope.departments = [];
    $scope.buildings = [];
    $scope.rooms = [];

	$Item.get($stateParams.id).then(function (res) {
        $scope.item = res.data[0];
        $scope.itemCopy = angular.copy($scope.item);

        $ItemType.getAll().then((res) => {
            $scope.types = res.data;
        });

        $Department.getAll().then((res) => {
	        $scope.departments = res.data;
	    });

        $Building.getAllByDepartment($scope.item.departmentId).then((res) => {
            $scope.buildings = res.data.buildings;
        });

        $Room.getAllByBuilding($scope.item.buildingId).then((res) => {
            $scope.rooms = res.data.rooms;
        });
    }, function (error) {
        Toast.error({
            content: { details: { error } }
        });
    });

    $scope.scans = [
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"},
    	{date: "4/14/17 1:30 PM", building: "Streibel Hall", room: 109, scanner: "Eddie Carlson", price: "200.00"}
    ];	

    $scope.toggleEdit = () => {
    	$scope.showEdit = !$scope.showEdit;
    }

    $scope.setDepartment = () => {
        $scope.buildings = [];
        $scope.rooms = [];
        $Building.getAllByDepartment($scope.department.id).then((res) => {
            $scope.buildings = res.data.buildings;
        });
    }

    $scope.setBuilding = () => {
        $scope.rooms = [];
        $Room.getAllByBuilding($scope.building.id).then((res) => {
            $scope.rooms = res.data.rooms;
        });
    }

    $scope.save = () => {
    	console.log('save');
    	$scope.toggleEdit();
    	$Item.update($scope.item.id, $scope.item).then(function (res) {
	        $scope.itemCopy = angular.copy($scope.item);

	        Toast.success({
	            content: { 
	            	details: {
	            		success: 'Updated Item'
	            	}
	            }
	        });
	    }, function (error) {
	        Toast.error({
	            content: { details: { error } }
	        });
	    });

    }

    $scope.cancel = () => {
    	console.log('cancel');
    	$scope.item = angular.copy($scope.itemCopy);

    	$scope.toggleEdit();
    }

    $scope.loadScanHistory = function () {
        $scope.promise = $timeout(function () {
        	// get scan history
        }, 2000);
    };
});
