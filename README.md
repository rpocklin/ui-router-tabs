# UI Router Tabs

Leverages [UI Bootstrap](http://angular-ui.github.io/bootstrap/) and [UI Router](https://github.com/angular-ui/ui-router) to give you full-strength route-driven tabs in Angular.js.

[![Build Status](https://secure.travis-ci.org/rpocklin/ui-router-tabs.svg)](http:/travis-ci.org/rpocklin/ui-router-tabs)

## Example / Demo
[Link](http://rpocklin.github.io/ui-router-tabs/example/index.html)

## How to Install / Usage

1. Install the plugin into your Angular.js project, manually or via `bower install angular-ui-router-tabs`
1. Add `ui.router.tabs` as a new module dependency in your angular app.

1. Define your routes in a hierarchy that makes sense for a tabbed layout, eg:
    ```javascript
$stateProvider.state('user', {
  url:         '',
  templateUrl: 'example.html',
  controller: 'UserCtrl',
}).state('user.settings', {
  url:         '/user/settings',
  templateUrl: 'user/settings.html'
}).state('user.accounts', {
  url:         '/user/accounts',
  templateUrl: 'user/accounts.html'
});
```

1. Define your `tabData` (or similiar variable) in the root view controller of your tabs (ie. `UserCtrl` in the case above) eg:
```javascript
    $scope.tabData   = [
      {
        heading: 'Settings',
        route:   'user.settings'
      },
      {
        heading: 'Accounts',
        route:   'user.accounts'
      }
    ];
```

1. Declare the following in your the parent HTML view template `<tabs data="tabData" type="tabs" />`.

Optional attributes for the `<tabs>` (which are passed on to the UI Bootstrap component) are:

- `type: [ 'tabs' | 'pills' ]`
- `vertical: boolean`
- `justified: boolean`

## Tips
* You can move the `<tabs>` tag around to wherever you like.
* Left-positioned seems best suited for responsive design.
* You can update the `tabData` variable dynamically, if you want to.

### Running Locally
1. Checkout git repository locally: `git clone git@github.com:rpocklin/ui-router-tabs.git`
1. `npm install`
1. `bower install`
1. `grunt serve`
1. View `http://localhost:9000/example/`in your browser to see the example.
