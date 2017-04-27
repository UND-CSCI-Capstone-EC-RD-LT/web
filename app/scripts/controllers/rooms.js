'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:RoomsCtrl
 * @description
 * # RoomsCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('RoomsCtrl', function ($scope, $mdDialog, $mdEditDialog, $Building, $Room, Toast) {
  $scope.selected = [];
  $scope.showSearch = false;

	($scope.load = () => {
    $Building.getAll().then(res => {
      $scope.buildings = res.data;
      $Room.getAllWithItems().then(res => {
  			$scope.rooms = res.data.map(item => {
          item.itemCount = item.items.length;
          return item;
        });
  		}, (error) => Toast.error({ details: { content: error.data.message } }));
    }, (error) => Toast.error({ details: { content: error.data.message } }));
	})();

  $scope.displayTime = timestamp => moment(timestamp).format(' M/D/Y h:m a');

  $scope.sort = type => {
    let ASC = type.slice(0, 1) === '-' ? false : true;
    let attr = ASC ? type : type.slice(1, type.length);
    $scope.rooms.sort((a, b) => {
      let A;
      let B;
      if (typeof a[attr] == 'number') {
        A = a[attr];
        B = b[attr];
      } else {
        A = a[attr].toUpperCase();
        B = b[attr].toUpperCase();
      }
      if (!ASC) [A, B] = [B, A];
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  };

  $scope.editBuilding = room => $Room.update(room.id, { "building": room.building });

  $scope.editNumber = (event, room) => {
   let editDialog = {
     modelValue: room.number,
     save: input => {
       if (input.$modelValue.length > 0) {
         room.number = input.$modelValue;
         $Room.update(room.id, { "number": room.number });
       }
     },
     targetEvent: event,
     title: 'Edit Room Number',
   };

   $mdEditDialog.small(editDialog);
 };

  $scope.add = ev => {
    $mdDialog.show({
      controller: 'AddRoomCtrl',
      templateUrl: './views/addRoom.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    }).then(answer => {
      $scope.load();
      Toast.success();
    }, () => {});
  };

  $scope.delete = () => Promise.all($scope.selected.map(item => $Room.delete(item.id))).then(res => {
      $scope.load();
      Toast.success();
      $scope.selected = [];
    }, error => Toast.error({ details: { content: error.data.message } }));

}).controller('AddRoomCtrl', function ($scope, $mdDialog, $Building, $Room, Toast, Auth) {

  $scope.new = {
    name: '',
    building: '',
  };

  $Building.getAll().then(res => $scope.buildings = res.data, error => Toast.error({ details: { content: error.data.message } }));

  $scope.hide = () => $mdDialog.hide();

  $scope.cancel = () => $mdDialog.cancel();

  $scope.add = () => {
      $scope.new.creator = Auth.getUser().id;
      $Room.create($scope.new).then(res => $mdDialog.hide(true), error => Toast.error({ details: { content: error.data.message } }));
  };

});
