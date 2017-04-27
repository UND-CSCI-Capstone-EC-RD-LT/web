'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:ItemTypesCtrl
 * @description
 * # ItemTypesCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('ItemTypesCtrl', function ($scope, $mdDialog, $mdEditDialog, $ItemType, Toast) {
  $scope.selected = [];
  $scope.showSearch = false;

	($scope.load = () => {
		$ItemType.getAll().then(res => {
      $scope.itemTypes = res.data;
    }, (error) => {
      Toast.error({ details: { content: error.data.message } });
    });
	})();

  $scope.displayTime = timestamp => moment(timestamp).format(' M/D/Y h:m a');

  $scope.sort = type => {
    let ASC = type.slice(0, 1) === '-' ? false : true;
    let attr = ASC ? type : type.slice(1, type.length);
    $scope.itemTypes.sort((a, b) => {
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

  $scope.editName = function (event, itemtype) {
   let editDialog = {
     modelValue: itemtype.name,
     save: input => {
       if (input.$modelValue.length > 0) {
         itemtype.name = input.$modelValue;
         $ItemType.update(itemtype.id, { "name": itemtype.name });
       }
     },
     targetEvent: event,
     title: 'Edit Item Type Name',
   };

   $mdEditDialog.small(editDialog);
 };

  $scope.add = (ev) => {
    $mdDialog.show({
      controller: 'AddItemTypeCtrl',
      templateUrl: './views/addItemType.html',
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

  $scope.delete = () => Promise.all($scope.selected.map(item => $ItemType.delete(item.id))).then(res => {
      $scope.load();
      Toast.success();
      $scope.selected = [];
    }, error => Toast.error({ details: { content: error.data.message } }));

}).controller('AddItemTypeCtrl', function ($scope, $mdDialog, $ItemType, Toast, Auth) {

  $scope.new = {
    name: '',
  };
  $scope.hide = () => $mdDialog.hide();

  $scope.cancel = () => $mdDialog.cancel();

  $scope.add = () => {
      $scope.new.creator = Auth.getUser().id;
      $ItemType.create($scope.new).then(res => $mdDialog.hide(true), error => Toast.error({ details: { content: error.data.message } }));
  };

});
