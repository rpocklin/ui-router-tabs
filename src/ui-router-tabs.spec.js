'use strict';

var forceResolveFailure = false;

var loadData = function() {
  if (forceResolveFailure) {
    throw new Error();
  }

  return [];
};

beforeEach(function() {

  module('ui.router.tabs');
  module('ui.router');
  module('ui.bootstrap');

  module(function($stateProvider) {
    $stateProvider
      .state('menu', {
        url: '/menu',
        resolve: {
          data: loadData
        }
      })
      .state('menu.route1', {
        url: '/route1',
        resolve: {
          data: loadData
        }
      }).state('menu.route2', {
        url: '/route2',
        resolve: {
          data: loadData
        }
      })
      .state('notabs', {
        url: '/notabs',
        resolve: {
          data: loadData
        }
      });
  });

  this.sandbox = sinon.sandbox.create();
  forceResolveFailure = false;
});

afterEach(function() {
  this.sandbox.restore();
});

describe('Directive : UI Router : Tabs', function() {

  var transitions, isolate_scope, scope, directive_scope, view, element, state, sandbox, spy;
  var createView, get_current_state, get_current_params;
  var $ngView;
  var params = {};

  beforeEach(inject(function($rootScope, $transitions, $state, $templateCache) {

    createView = function(html, scope) {
      element = angular.element(view);

      inject(function($compile) {
        $ngView = $compile(html)(scope);
      });

      scope.$digest();
      directive_scope = $ngView.isolateScope();

      return $ngView;
    };

    scope = $rootScope.$new();
    state = $state;

    transitions = $transitions;

    get_current_state = function() {
      return state.current.name;
    };

    get_current_params = function() {
      return state.params;
    };

    scope.tabConfiguration = [{
      heading: 'Heading 1A',
      route: 'menu.route1'
    }, {
      heading: 'Heading 1B',
      route: 'menu.route1',
      params: {
        a: 5
      }
    }, {
      heading: 'Heading 2',
      route: 'menu.route2',
      params: params
    }];

    view = '<tabs data="tabConfiguration" type="pills" class="someClass"></tabs>';
    sandbox = this.sandbox;
  }));

  var renderView = function() {
    $ngView = createView(view, scope);

    isolate_scope = $ngView.isolateScope();
    spy = sandbox.spy(state, 'go');
  };

  it('should define the tabs directive with isolated scope', function() {
    renderView();
    expect(directive_scope).toBeDefined();
  });

  it('should throw an error if no data attribute was specified', function() {
    renderView();

    expect(function() {
      createView('<tabs></tabs>', scope);
    }).toThrow('UI Router Tabs: \'data\' attribute not defined, please check documentation for how to use this directive.');
  });

  it('should throw an error if no data attributes is not an array', function() {
    renderView();

    expect(function() {
      scope.tabConfiguration = {};
      createView('<tabs data="tabConfiguration"></tabs>', scope);
    }).toThrow('UI Router Tabs: \'data\' attribute must be an array of tab data with at least one tab defined.');
  });

  it('should initialise the tab configuration correctly when defined', function() {
    renderView();

    expect(scope.tabConfiguration).toBeDefined();
    expect(directive_scope.tabs).toBeDefined();

    expect(scope.tabConfiguration).toEqual(directive_scope.tabs);
    expect(directive_scope.type).toEqual('pills');
    expect(directive_scope.class).toEqual('someClass');
  });

  it('should route to the correct entry in tabConfiguration array', function() {
    view = '<tabs data="tabConfiguration"></tabs>';
    renderView();

    var tabIndex = 2;
    var route = scope.tabConfiguration[tabIndex].route;
    state.go(route);

    scope.$apply();

    expect(get_current_state()).toEqual(route);
    expect(scope.tabConfiguration[tabIndex].active).toBeTruthy();
  });

  it('should change the route and update the tabs when selecting a different tab', function() {
    renderView();

    var previous_state = get_current_state();

    $ngView.find('a').eq(2).click();
    scope.$apply();

    expect(get_current_state()).not.toEqual(previous_state);
  });

  it('should not change the route or active tab heading if a $transitions.onStart handler cancels the route change', function() {

    view = '<tabs data="tabConfiguration"></tabs>';
    renderView();

    var initialTabIndex = 0;
    var initialRoute = scope.tabConfiguration[initialTabIndex].route;
    state.go(initialRoute);

    scope.$apply();

    transitions.onStart({}, function() {
      return false;
    });

    var targetTabIndex = 2;
    var targetRoute = scope.tabConfiguration[targetTabIndex].route;

    state.go(targetRoute);
    scope.$apply();

    expect(get_current_state()).toEqual(initialRoute);
    expect(scope.tabConfiguration[initialTabIndex].active).toBeTruthy();
  });

  it('should not change the route or active tab heading if a state change fails during the route change', function() {

    view = '<tabs data="tabConfiguration"></tabs>';
    renderView();

    var initialTabIndex = 0;
    var initialRoute = scope.tabConfiguration[initialTabIndex].route;
    state.go(initialRoute);

    scope.$apply();

    forceResolveFailure = true;

    var targetTabIndex = 2;
    var targetRoute = scope.tabConfiguration[targetTabIndex].route;

    state.go(targetRoute);
    scope.$apply();

    expect(get_current_state()).toEqual(initialRoute);
    expect(scope.tabConfiguration[initialTabIndex].active).toBeTruthy();
  });

  it('should not change the route or active tab heading if a state is not found during the route change', function() {

    view = '<tabs data="tabConfiguration"></tabs>';
    renderView();

    var initialTabIndex = 0;
    var initialRoute = scope.tabConfiguration[initialTabIndex].route;
    state.go(initialRoute);

    scope.$apply();

    forceResolveFailure = true;

    var targetTabIndex = 2;
    var targetRoute = 'some.invalid.route';

    try {
      state.go(targetRoute);
    }
    catch (error) { /* do nothing */ }

    scope.$apply();

    expect(get_current_state()).toEqual(initialRoute);
    expect(scope.tabConfiguration[initialTabIndex].active).toBeTruthy();
  });

  it('should not change the route when selecting the current tab', function() {
    renderView();

    $ngView.find('a').eq(0).click();

    scope.$apply();
    spy.reset();

    var previous_state = get_current_state();

    $ngView.find('a').eq(0).click();
    scope.$apply();

    expect(get_current_state()).toEqual(previous_state);
    expect(spy.notCalled).toBeTruthy();
  });

  it('should not change the route when the clicked tab is disabled', function() {

    renderView();

    $ngView.find('a').eq(2).click();

    scope.$apply();
    spy.reset();

    var previous_state = get_current_state();

    scope.tabConfiguration[0].disable = true;
    $ngView.find('a').eq(0).click();
    scope.$apply();

    expect(get_current_state()).toEqual(previous_state);
    expect(spy.notCalled).toBeTruthy();
  });
});
