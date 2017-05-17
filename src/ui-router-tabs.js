'use strict';

/**
 * Permits declarative (and dynamic) definitions of tab links with full routes.
 *
 * requires 'ui.router' and 'ui.bootstrap'
 * (uses tabset and tab directives in ui.bootstrap and route changes in ui.router)
 *
 * You can define (for styling) the attributes type="pills" and vertical="true | false" and justified="true | false"
 * You can also specify arbitrary CSS classes to be added to each tab by providing them as values with the "class" parameter
 * (for the 'tabs' or 'tab' elements, and the 'template-url' for custom tab rendering.
 *
 * Watches the $stateChangeXX events so it can update the parent tab(s) when using $state.go or ui-sref anchors.
 *
 * See ui-router-tabs.spec.js for tests.
 *
 * Author: Robert Pocklington (rpocklin@gmail.com)
 * License: MIT
 *
 */

/* Common.js package manager support (e.g. ComponentJS, WebPack) */
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'ui.router.tabs';
}

angular.module('ui.router.tabs', ['ngSanitize']);
angular.module('ui.router.tabs').directive(
  'tabs', ['$transitions', '$state', function($transitions, $state) {

    return {
      restrict: 'E',
      scope: {
        tabs: '=data',
        type: '@',
        justified: '@',
        vertical: '@',
        class: '@'
      },
      link: function(scope) {

        var updateTabs = function() {
          scope.update_tabs();
        };

        var unbindStateChangeSuccess = $transitions.onSuccess({}, updateTabs);
        var unbindStateChangeError = $transitions.onError({}, updateTabs);

        scope.$on('$destroy', unbindStateChangeSuccess);
        scope.$on('$destroy', unbindStateChangeError);
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

          if (!currentStateEqualTo(tab) && !tab.disable) {
            $state.go(tab.route, tab.params, tab.options);
          }
        };

        /* whether to highlight given route as part of the current state */
        $scope.is_active = function(tab) {

          var isAncestorOfCurrentRoute = $state.includes(tab.route, tab.params, tab.options);
          return isAncestorOfCurrentRoute;
        };

        $scope.update_tabs = function() {

          // sets which tab is active (used for highlighting)
          angular.forEach($scope.tabs, function(tab, index) {
            tab.params = tab.params || {};
            tab.options = tab.options || {};
            tab.class = tab.class || '';

            tab.active = $scope.is_active(tab);
            if (tab.active) {
              $scope.tabs.active = index;
            }
          });
        };

        $scope.update_tabs();
    }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabs-default-template.html';
      }
    };
}]
).run(
['$templateCache', function($templateCache) {
    var CUSTOM_UI_VIEW_TEMPLATE = '<div>' +
      '<uib-tabset active="tabs.active" class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}" class="{{class}}">' +
      '<uib-tab class="tab {{tab.class}}" ng-repeat="tab in tabs" ' +
      'disable="tab.disable" ng-click="go(tab)">' +
      '<uib-tab-heading ng-bind-html="tab.heading"></uib-tab-heading>' +
      '</uib-tab>' +
      '</uib-tabset>' +
      '</div>';

    var INLINE_TEMPLATE = '<div>' +
      '<uib-tabset active="tabs.active" class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}" class="{{class}}">' +
      '<uib-tab class="tab {{tab.class}}" ng-repeat="tab in tabs" ' +
      'disable="tab.disable" ng-click="go(tab)">' +
      '<uib-tab-heading ng-bind-html="tab.heading"></uib-tab-heading>' +
      '</uib-tab>' +
      '</uib-tabset>' +
      '<ui-view></ui-view>' +
      '</div>';

    $templateCache.put('ui-router-tabs-custom-ui-view-template.html', CUSTOM_UI_VIEW_TEMPLATE);
    $templateCache.put('ui-router-tabs-default-template.html', INLINE_TEMPLATE);
}]
);
