'use strict';

/**
 * Permits declarative (and dynamic) definitions of tab links with full routes.
 *
 * requires 'ui.router' and 'ui.bootstrap'
 * (uses tabset and tab directives in ui.bootstrap and route changes in ui.router)
 *
 * NOTE: suggest to load any common model in the parent controller.resolve
 * and you don't have to make the parent view abstract - it will default to the first tab.
 *
 * If you don't want this, link to the page via your desired tab child state directly.
 *
 * You can define (for styling) the attributes type="pills" and vertical="true | false" and justified="true | false"
 *
 * Uses a $rootScope watcher to explicitly update the parent tab(s) when using $state.go or ui-sref anchors.
 *
 * See tab-directive.spec.js for usage examples.
 *
 * Author: Robert Pocklington (rpocklin@gmail.com)
 * License: MIT
 *
 */

angular.module('ui.router.tabs', []);
angular.module('ui.router.tabs').directive('tabs', ['$rootScope', '$state',
  function($rootScope, $state) {

    return {
      restrict: 'E',
      scope: {
        tabs: '=data',
        type: '@',
        justified: '@',
        vertical: '@'
      },
      link: function(scope) {

        var unbindStateChangeSuccess = $rootScope.$on('$stateChangeSuccess',
          function() {
            scope.update_tabs();
          });

        scope.$on('$destroy', unbindStateChangeSuccess);
      },
      controller: ['$scope',
        function($scope) {

          if (!$scope.tabs) {
            throw new Error('\'data\' attribute not defined, please check documentation for how to use this directive.');
          }

          if (!angular.isArray($scope.tabs)) {
            throw new Error('\'data\' attribute must be an array of tab data with at least one tab defined.');
          }

          $scope.go = function(route, params, options) {
            $state.go(route, params, options);
          };

          $scope.active = function(route) {
            var isAncestorOfCurrentRoute = $state.includes(route);
            return isAncestorOfCurrentRoute;
          };

          $scope.update_tabs = function() {

            // sets which tab is active (used for highlighting)
            angular.forEach($scope.tabs, function(tab) {
              tab.active = $scope.active(tab.route);
              tab.params = tab.params || {};
              tab.options = tab.options || {};

              if (tab.active) {
                $scope.current_tab = tab;
              }
            });
          };

          // initialise tabs when creating the directive
          $scope.update_tabs();

          // if none are active, set the default
          $scope.current_tab = $scope.current_tab || $scope.tabs[0];
          $scope.go($scope.current_tab.route, $scope.current_tab.params, $scope.current_tab.options);
    }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabs-default-template.html';
      }
    };
}]).run(['$templateCache',
  function($templateCache) {
    var DEFAULT_TEMPLATE = '<div>' +
      '<tabset class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}">' +
      '  <tab class="tab" ng-repeat="tab in tabs" heading="{{tab.heading}}" ui-sref="{{tab.route}}(tab.params)"' +
      '    ui-sref-opts="{{tab.options}}" ng-click active="tab.active">' +
      '  </tab>' +
      '</tabset>' +
      '</div>';

    $templateCache.put('ui-router-tabs-default-template.html', DEFAULT_TEMPLATE);
  }]);
