'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
  'ui.router.tabs'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('user');

  $stateProvider.state('user', {
    url:         '/user',
    controller: 'ExampleCtrl',
    templateUrl: 'example.html'
  }).state('user.accounts', {
    url:         '/accounts',
    templateUrl: 'user/accounts.html',
    controller: 'ExampleCtrl'
  }).state('user.settings', {
    url:         '/settings',
    params: {test: 5},
    controller: 'SettingsCtrl',
    templateUrl: 'user/settings/settings.html'
  }).state('user.settings.one', {
    url:         '/one',
    controller: 'ExampleCtrl',
    template: '<div>Settings nested route 1</div>'
  }).state('user.settings.two', {
    url:         '/two',
    controller: 'ExampleCtrl',
    template: '<div>Settings nested route 2</div>'
  });
}]);
