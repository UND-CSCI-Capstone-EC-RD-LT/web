'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:BuildingsCtrl
 * @description
 * # BuildingsCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('BuildingsCtrl', function ($scope, $mdDialog, $mdEditDialog, $Department, $Building, Toast) {
  $scope.selected = [];
  $scope.showSearch = false;

	($scope.load = () => {
    $Department.getAll().then(res => {
      $scope.departments = res.data;
      $Building.getAllWithRooms().then(res => {
  			$scope.buildings = res.data.map(item => {
          item.roomCount = item.rooms.length;
          return item;
        });
  		}, (error) => Toast.error({ details: { content: error.data.message } }));
    }, (error) => Toast.error({ details: { content: error.data.message } }));
	})();

  $scope.displayTime = timestamp => moment(timestamp).format(' M/D/Y h:m a');

  $scope.sort = type => {
    let ASC = type.slice(0, 1) === '-' ? false : true;
    let attr = ASC ? type : type.slice(1, type.length);
    $scope.buildings.sort((a, b) => {
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

  $scope.editDepartment = building => $Building.update(building.id, { "department": building.department });

  $scope.editName = (event, building) => {
   let editDialog = {
     modelValue: building.name,
     save: input => {
       if (input.$modelValue.length > 0) {
         building.name = input.$modelValue;
         $Building.update(building.id, { "name": building.name });
       }
     },
     targetEvent: event,
     title: 'Edit Department Name',
   };

   $mdEditDialog.small(editDialog);
 };

  $scope.add = ev => {
    $mdDialog.show({
      controller: 'AddBuildingCtrl',
      templateUrl: './views/addBuilding.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    }).then(answer => {
      $scope.load();
      Toast.success();
    }, function() {
        $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.delete = () => Promise.all($scope.selected.map(item => $Building.delete(item.id))).then(res => {
      $scope.load();
      Toast.success();
      $scope.selected = [];
    }, error => Toast.error({ details: { content: error.data.message } }));

}).controller('AddBuildingCtrl', function ($scope, $mdDialog, $Department, $Building, Toast, Auth) {

  $scope.new = {
    name: '',
    department: '',
  };

  $Department.getAll().then(res => $scope.departments = res.data, error => Toast.error({ details: { content: error.data.message } }));

  $scope.hide = () => $mdDialog.hide();

  $scope.cancel = () => $mdDialog.cancel();

  $scope.add = () => {
      $scope.new.creator = Auth.getUser().id;
      $Building.create($scope.new).then(res => $mdDialog.hide(true), error => {
        console.log(error);
        Toast.error({ details: { content: error.data.message } });
      });
  };

});
