'use strict';

var ExampleCtrl = ['$rootScope', '$state', '$scope', '$stateParams', function($rootScope, $state, $scope) {

  $scope.initialise = function() {

    $scope.go = function(state) {
      $state.go(state);
    };

    $scope.tabData   = [
      {
        heading: 'Settings',
        route:   'user.settings',
        params: {}
      },
      {
        heading: 'Accounts',
        route:   'user.accounts',
        params : {}
      },
      {
        heading: 'Accounts With Params',
        route:   'user.accounts',
        params: {a: 5}
      }
    ];
  };

  $scope.initialise();
}];

angular.module('example').controller('ExampleCtrl', ExampleCtrl);
