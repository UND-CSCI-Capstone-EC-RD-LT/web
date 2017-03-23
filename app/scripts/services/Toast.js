'use strict';

/**
 * @ngdoc service
 * @name Toast
 * @description
 * Service to create a toast
 *
 *  Show function can do all setting
 *  Toast.show({
        theme: 'default',
        hideDelay: 3000,
        position: top right,
        type: "success",
        content: "Configuration Saved",
        close: true,
        details: {
            title: 'More Info Title',
            content: 'More Info Content'
        }
    });
 *
 *  These are the preset options
 *  Toast.success();
    Toast.error({ content: "Error Message" }); <- Without Dialog Button or for Dialog Button use -> Toast.error({ details: { content: "Error Message" } });
    Toast.warning({ content: "Warning Message" }); <- Without Dialog Button or for Dialog Button use -> Toast.warning({ details: { content: "Warning Message" } });
    Toast.info({ content: "Info Message" }); <- Without Dialog Button or for Dialog Button use -> Toast.info({ details: { content: "Info Message" } });
 *
 */
angular.module('undimswebApp').
service('Toast', function ($mdToast) {
  const defaults = {
    theme: 'default', //default - follows Google | flip - default but ctext colors flipped | light - background color change
    type: 'success',
    hideDelay: 3000,
    position: 'top right',
    details: {
      title: 'Details',
      content: 'No Details'
    }
  }

  return {
    setup: function (caller, data, type = 'success', content = 'Missing Content', title = 'Missing Title') {
      if (typeof data == 'undefined') var data = {};
      if (caller == 'success') delete data.details;
      if (!data.hasOwnProperty('theme')) data.theme = defaults.theme;
      if (data.theme == 'default') data.type = type;
      else data.type = `${type}-${data.theme}`;
      if (!data.hasOwnProperty('content')) data.content = content;
      if (data.hasOwnProperty('details') && !data.details.hasOwnProperty('title')) data.details.title = title;
      return data;
    },
    success: function (data) {
      return this.show(this.setup('success', data, 'success', 'Success'), false);
    },
    error: function (data) {
      return this.show(this.setup('error', data, 'error', 'Failed', 'Error Details'), false);
    },
    warning: function (data) {
      return this.show(this.setup('warning', data, 'warning', 'Warning', 'Warning Details'), false);
    },
    info: function (data) {
      return this.show(this.setup('info', data, 'info', 'Info', 'Info Details'), false);
    },
    show: function (data, intital = true) {
      if (intital) data = this.setup('show', data);
      $mdToast.show({
        hideDelay: data.hasOwnProperty('hideDelay') ? data.hideDelay : defaults.hideDelay,
        position: data.hasOwnProperty('position') ? data.position : defaults.position,
        templateUrl: 'scripts/services/templates/toast.html',
        controller: function ($scope, $mdDialog) {
          delete data.hideDelay;
          delete data.position;
          Object.assign(this, data);

          var isDlgOpen;

          $scope.closeToast = function () {
            if (isDlgOpen) return;

            $mdToast.hide().then(function () {
              isDlgOpen = false;
            });
          };

          $scope.openDetails = function (e) {
            if (isDlgOpen) return;
            isDlgOpen = true;

            $mdDialog.show(
              $mdDialog
              .alert()
              .title(data.details.hasOwnProperty('title') ? `${data.details.title}` : defaults.details.title)
              .textContent(data.details.hasOwnProperty('content') ? `${data.details.content}` : defaults.details.content)
              .ariaLabel('Details')
              .ok('Close')
              .targetEvent(e)
              .clickOutsideToClose(true)
            ).then(function () {
              isDlgOpen = false;
            });
          };
        },
        controllerAs: 'toast'
      });
    }
  };
});
