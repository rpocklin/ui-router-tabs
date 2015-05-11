'use strict';

var SettingsCtrl = ['$rootScope', '$scope', '$stateParams', function($rootScope, $scope) {

  $scope.initialise = function() {

    $scope.tabData   = [
      {
        heading: 'One',
        route:   'user.settings.one',
        url: 'user/settings/one/:test',
        controller: 'ExampleCtrl'
      },
      {
        heading: 'Two',
        route:   'user.settings.two'
      }
    ];
  };

  $scope.initialise();
}];

angular.module('example').controller('SettingsCtrl', SettingsCtrl);
