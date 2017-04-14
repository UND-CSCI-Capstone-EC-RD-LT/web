'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('ItemCtrl', function ($scope, $stateParams, $Item) {

	console.log($stateParams.id);

	$Item.get($stateParams.id).then(function (res) {
		console.log(res.data);
        $scope.item = res.data[0];
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
});
