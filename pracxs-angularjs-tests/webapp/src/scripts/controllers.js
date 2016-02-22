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
  'angular',
  'src/scripts/services'
], function() {
    angular.module('pracxsApp.controllers', ['pracxsApp.services'])
      .controller('MenuCtrl', [
        '$scope', 'MenuService', '$location',
        function ($scope, MenuService, $location) {
          MenuService.getMenu().success(function(data) {
            $scope.categories = data

            $scope.$watch( 'categories', function() {
              var total = 0.0

              angular.forEach( $scope.categories, function(category) {
                angular.forEach( category.items, function (item) {
                  if( item.ordered )
                    total += (item.price * item.ordered)
                })
              })

              $scope.orderTotal = total
            }, true)
          })

          $scope.doOrder = function() {
            $location.url('/confirm')
          }
        }
      ])
      .controller('ConfirmCtrl', [
        '$scope',
        function ($scope) {
        }
      ])
})
