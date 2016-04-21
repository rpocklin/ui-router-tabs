'use strict';

var ExampleCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {

  $scope.initialise = function() {

    $scope.go = function(state) {
      $state.go(state);
    };

    $scope.tabData   = [
      {
        heading: '<i>Settings</i>',
        route:   'user.settings'
      },
      {
        heading: '<i>Accounts</i>',
        route:   'user.accounts'
      }
    ];
  };

  $scope.initialise();
}];

angular.module('example').controller('ExampleCtrl', ExampleCtrl);
