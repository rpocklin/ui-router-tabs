'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
  'ui.router.tabs'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('user', {
    url:         '',
    controller: 'UserCtrl',
    templateUrl: 'example.html'
  }).state('user.accounts', {
    url:         '/user/accounts',
    templateUrl: 'user/accounts.html'
  }).state('user.settings', {
    url:         '/user/settings',
    templateUrl: 'user/settings.html',
    controller: 'SettingsCtrl'
  }).state('user.settings.one', {
    url:         '/user/settings/one',
    template: '<div>one</div>'
  }).state('user.settings.two', {
    url:         '/user/settings/two',
    template: '<div>two</div>'
  }).state('user.accounts', {
    url:         '/user/accounts',
    templateUrl: 'user/accounts.html'
  });
});