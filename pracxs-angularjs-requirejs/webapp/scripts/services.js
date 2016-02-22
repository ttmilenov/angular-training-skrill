/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

'use strict';

define([
  'angular'
], function() {
    angular.module('pracxsApp.services', [])
      .service('MenuService', [
        '$http',
        function($http) {
          this.getMenu = function() {
            return $http.get('/rest/menu')
          }
        }
      ])
      .factory('jQuery', [
        '$window',
        function ($window) {
            return $window.jQuery
        }
      ])
})
