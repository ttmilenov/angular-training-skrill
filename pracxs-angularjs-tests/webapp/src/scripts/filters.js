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
    angular.module('pracxsApp.filters', [])
      .filter('nullCurrency', [
        '$filter',
        function($filter) {
          return function (input) {
            if (input === '' || input === null || input == 0 )
              return ''
            else
              return $filter("currency") (input)
          }
        }
      ])
})
