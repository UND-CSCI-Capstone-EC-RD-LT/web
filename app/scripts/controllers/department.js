'use strict';

/**
 * @ngdoc function
 * @name undimswebApp.controller:DepartmentsCtrl
 * @description
 * # DepartmentsCtrl
 * Controller of the undimswebApp
 */
angular.module('undimswebApp').controller('DepartmentsCtrl', function ($scope, $mdDialog, $mdEditDialog, $Department, Toast) {
  $scope.selected = [];
  $scope.showSearch = false;

	($scope.load = () => {
		$Department.getAllWithBuildings().then((res) => {
			$scope.departments = res.data.map(item => {
        item.buildingCount = item.buildings.length;
        return item;
      });
      $scope.departmentsBackup = $scope.departments;
		}, (error) => Toast.error({ details: { content: error.data.message } }));
	})();

  $scope.displayTime = timestamp => moment(timestamp).format(' M/D/Y h:m a');

  $scope.sort = (type) => {
    let ASC = type.slice(0, 1) === '-' ? false : true;
    let attr = ASC ? type : type.slice(1, type.length);
    $scope.departments.sort((a, b) => {
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

  $scope.editName = function (event, department) {
   let editDialog = {
     modelValue: department.name,
     save: input => {
       if (input.$modelValue.length > 0) {
         department.name = input.$modelValue;
         $Department.update(department.id, { "name": department.name });
       }
     },
     targetEvent: event,
     title: 'Edit Department Name',
   };

   $mdEditDialog.small(editDialog);
 };

  $scope.add = (ev) => {
    $mdDialog.show({
      controller: 'AddDepartmentCtrl',
      templateUrl: './views/addDepartment.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    }).then(function(answer) {
      $scope.load();
      Toast.success();
    }, function() {
        $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.delete = () => Promise.all($scope.selected.map(item => $Department.delete(item.id))).then(res => {
      $scope.load();
      Toast.success();
      $scope.selected = [];
    }, error => Toast.error({ details: { content: error.data.message } }));
}).controller('AddDepartmentCtrl', function ($scope, $mdDialog, $Department, Toast, Auth) {

  $scope.new = {
    name: '',
  };

  $scope.hide = () => $mdDialog.hide();

  $scope.cancel = () => $mdDialog.cancel();

  $scope.add = () => {
      $scope.new.creator = Auth.getUser().id;
      $Department.create($scope.new).then(res => $mdDialog.hide(true), error => Toast.error({ details: { content: error.data.message } }));
  };

});
