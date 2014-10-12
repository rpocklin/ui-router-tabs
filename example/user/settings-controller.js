'use strict';

var SettingsCtrl = function($rootScope, $scope) {

  $scope.initialise = function() {

    $scope.tabData   = [
      {
        heading: 'One',
        route:   'user.settings.one'
      },
      {
        heading: 'Two',
        route:   'user.settings.two'
      }
    ];
  };

  $scope.initialise();
};

angular.module('example').controller('SettingsCtrl', SettingsCtrl);
