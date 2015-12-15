/**
 * This is the default module that bootstraps up angular.
 */
(function() {

  /**
   * Always declare 'use strict'
   */
  'use strict';

  /**
   * Require the base level module which will be used in ng-app
   */
  angular
    .module('app', [
      'ui.router',
      'ngSanitize'
    ])
    .config(config)
    .run(run);

  /**
   * config() Bootstraps the initial configuration for our application, setting
   * up the states based on UI Router. Returns nothing.
   */
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dash', {
        url: '/',
        templateUrl: 'components/dash/dash.html'
      });

    $locationProvider.html5Mode(true);
  }

  /**
   * run() Do some stuff at run time and before the app loads. Returns
   * nothing.
   */
  function run() {
    
  }

})();