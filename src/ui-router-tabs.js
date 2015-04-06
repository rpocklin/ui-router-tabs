'use strict';

/**
 * Permits declarative (and dynamic) definitions of tab links with full routes.
 *
 * requires 'ui.router' and 'ui.bootstrap'
 * (uses tabset and tab directives in ui.bootstrap and route changes in ui.router)
 *
 * You can define (for styling) the attributes type="pills" and vertical="true | false" and justified="true | false"
 *
 * Watches the $stateChangeXX events so it can update the parent tab(s) when using $state.go or ui-sref anchors.
 *
 * See ui-router-tabs.spec.js for tests.
 *
 * Author: Robert Pocklington (rpocklin@gmail.com)
 * License: MIT
 *
 */

angular.module('ui.router.tabs', []);
angular.module('ui.router.tabs').directive(
  'tabs', ['$rootScope', '$state', function($rootScope, $state) {

    return {
      restrict: 'E',
      scope: {
        tabs: '=data',
        type: '@',
        justified: '@',
        vertical: '@'
      },
      link: function(scope) {

        var unbindStateChangeSuccess = $rootScope.$on(
          '$stateChangeSuccess',
          function() {
            scope.update_tabs();
          }
        );

        scope.$on('$destroy', unbindStateChangeSuccess);
      },
      controller: ['$scope', function($scope) {

        if (!$scope.tabs) {
          throw new Error('UI Router Tabs: \'data\' attribute not defined, please check documentation for how to use this directive.');
        }

        if (!angular.isArray($scope.tabs)) {
          throw new Error('UI Router Tabs: \'data\' attribute must be an array of tab data with at least one tab defined.');
        }

        var currentStateEqualTo = function(tab) {

          var isEqual = $state.is(tab.route, tab.params, tab.options);
          return isEqual;
        };

        $scope.go = function(tab) {

          if (!currentStateEqualTo(tab) && !tab.disabled) {
            var promise = $state.go(tab.route, tab.params, tab.options);

            /* until the $stateChangeCancel event is released in ui-router, will use this to update
               tabs if the $stateChangeEvent is cancelled before it finishes loading the state, see
               https://github.com/rpocklin/ui-router-tabs/issues/19 and
               https://github.com/angular-ui/ui-router/pull/1090 for further information and
               https://github.com/angular-ui/ui-router/pull/1844

               $stateChangeCancel is better since it will handle ui-sref and external $state.go(..) calls */
            promise.catch(function() {
              $scope.update_tabs();
            });
          }
        };

        /* whether to highlight given route as part of the current state */
        $scope.active = function(tab) {

          var isAncestorOfCurrentRoute = $state.includes(tab.route, tab.params, tab.options);
          return isAncestorOfCurrentRoute;
        };

        $scope.update_tabs = function() {

          // sets which tab is active (used for highlighting)
          angular.forEach($scope.tabs, function(tab) {
            tab.params = tab.params || {};
            tab.options = tab.options || {};
            tab.active = $scope.active(tab);
          });
        };

        // this always selects the first tab currently - fixed in ui-bootstrap master but not yet released
        // see https://github.com/angular-ui/bootstrap/commit/91b5fb62eedbb600d6a6abe32376846f327a903d
        $scope.update_tabs();
    }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabs-default-template.html';
      }
    };
}]
).run(
['$templateCache', function($templateCache) {
    var DEFAULT_TEMPLATE = '<div><tabset class="tab-container" type="{{type}}" vertical="{{vertical}}" ' +
      'justified="{{justified}}">' + '<tab class="tab" ng-repeat="tab in tabs" heading="{{tab.heading}}" ' +
      'active="tab.active" disabled="tab.disabled" ng-click="go(tab)">' +
      '</tab></tabset></div>';

    $templateCache.put('ui-router-tabs-default-template.html', DEFAULT_TEMPLATE);
}]
);
