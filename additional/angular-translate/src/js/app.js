/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('pracxsApp',
  ['ngRoute',
   'pracxsApp.services',
   'pracxsApp.controllers',
   'pracxsApp.directives',
   'pracxsApp.filters',
   'pracxs.translate',
   'ui.bootstrap'])
.run(['$rootScope', '$location', function($rootScope, $location) {
   $rootScope.location = $location
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/menu.html',
      controller: 'MenuCtrl',
      reloadOnSearch: false
    })
    .when('/confirm', {
      templateUrl: 'views/confirm.html',
      controller: 'ConfirmCtrl'
    })
    .otherwise({redirectTo: '/'})
}])
