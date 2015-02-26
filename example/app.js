angular.module(
'example', ['ui.router', 'ui.bootstrap', 'ui.router.tabs']
).config(
['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state(
  'ones', {
    url: '/ones', templateUrl: 'ones.html'
  }
  )

  .state(
  'twos', {
    url: '/twos', templateUrl: 'twos.html'
  }
  );

  //$urlRouterProvider.otherwise('objects');
}]
).controller(
'mainController', function($scope) {
  $scope.tabs = [{
    heading: 'First', route: 'ones', id: 'onesTab'
  }, {
    heading: 'Second', route: 'twos', id: 'twosTab'
  }];
}
);
