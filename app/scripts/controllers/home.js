'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('HomeCtrl', function ($scope, $timeout, $mdDialog, $Department, $Building, $Room, $User, $Item, Toast) {

    $scope.showSearch = true;

    $scope.criteria = {
        department: null,
        building: null,
        room: null
    };

    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.limitOptions = [5, 10, 15, {
        label: 'All',
        value: function () {
          return $scope.items ? $scope.items.count : 0;
        }
    }];

    $scope.query = {
        order: 'type',
        // limit: 0,
        page: 1
    };

    $scope.selected = [];

    $scope.departments = [];
    $scope.buildings = [];
    $scope.rooms = [];

    $Department.getAll().then((res) => {
        $scope.departments = res.data;
    });

    $scope.setDepartment = () => {
        $scope.department = JSON.parse($scope.criteria.department);
        $scope.buildings = [];
        $scope.rooms = [];
        $Building.getAllByDepartment($scope.department.id).then((res) => {
            $scope.buildings = res.data.buildings;
        });
    }

    $scope.setBuilding = () => {
        $scope.building = JSON.parse($scope.criteria.building);
        $scope.rooms = [];
        $Room.getAllByBuilding($scope.building.id).then((res) => {
            $scope.rooms = res.data.rooms;
        });
    }

    $scope.setRoom = () => {
        $scope.room = JSON.parse($scope.criteria.room);
    }

    $scope.search = () => {
        $scope.items = [];
        $Item.search($scope.department.id, $scope.building.id, $scope.room.id).then(function (res) {
            if(res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].createdAt = moment(res.data[i].createdAt).format('M/D/YY h:mm A');
                    res.data[i].updatedAt = moment(res.data[i].updatedAt).format('M/D/YY h:mm A');
                }
                $scope.items = res.data;
            } else {
                $scope.items = [{barcode: "No Items"}];
            }
            $scope.showSearch = false;
        }, function (error) {
            Toast.error({
                content: { details: { error } }
            });
        });
    }

    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };

    $scope.getTypes = function () {
        return ['Candy', 'Ice cream', 'Other', 'Pastry'];
    };

    $scope.deselect = function (item) {
        console.log(item.barcode, 'was deselected');
    };

    $scope.log = function (item) {
        console.log(item.barcode, 'was selected');

    };

    $scope.loadItems = function () {
        $scope.promise = $timeout(function () {
            $Item.search(1, 1, 1).then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].createdAt = moment(res.data[i].createdAt).format('M/D/YY h:mm A');
                    res.data[i].updatedAt = moment(res.data[i].updatedAt).format('M/D/YY h:mm A');
                }

                $scope.items = res.data;
            }, function (error) {
                Toast.error({
                    content: { details: { error } }
                });
            });
        }, 2000);
    };

    $scope.toggleSearch = () => {
        $scope.showSearch = true
    }

    $scope.onReorder = function(order) { };


    // TODO: maybe add a quick edit option to each row
    $scope.showEditItem = function(item, ev) {
        $mdDialog.show({
            locals: {editItem: item},
            controller: 'EditItemCtrl',
            templateUrl: './views/edititem.html',
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
              .title('Delete Selected Items')
              .textContent('Are you sure you want to delete the selected items?')
              .ariaLabel('Delete Selected Items')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            // run delete code here
            console.log('Delete:');
            console.log($scope.selected);
        }, function() {
            // do nothing, user cancelled action
        });
    };
});
