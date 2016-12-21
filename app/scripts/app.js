'use strict';

/**
 * @ngdoc overview
 * @name suricatApp
 * @description
 * # suricatApp
 *
 * Main module of the application.
 */
angular
  .module('suricatApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies'
  ])

  .run(function($rootScope){
  
  $rootScope.pro='scribe';
  console.log($rootScope.pro);
});
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
