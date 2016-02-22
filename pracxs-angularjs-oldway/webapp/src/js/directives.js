/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

'use strict';

angular.module('pracxsApp.directives', ['pracxsApp.services'])
  .directive('numberMask',
    function() {
      return {
          restrict: 'A',
          link: function(scope, element) {
            element.on('keypress', function(e) {
              var verified = ( e.ctrlKey || e.altKey || e.metaKey || e.which == 8 || e.which == 13 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9]/)
              if (verified) { e.preventDefault() }
            })
            element.on('keyup', function() {
              if( Number($(this).val())==0 )
                $(this).val('')
            })
            element.on('change', function() {
              if( Number($(this).val())==0 )
                $(this).val('')
            })
          }
      }
    }
  )
  .directive('selectOnClick',
    function () {
      return {
        restrict: 'A',
        link: function (scope, element) {
          element.on('focus', function () {
            this.select()
          })
          element.on('click', function () {
            this.select()
          })
        }
      }
    }
  )
  .directive('focusOnClick', [
    'jQuery',
    function (jQ) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.on( 'click', function() {
            jQ(this).find(attrs.focusOnClick).focus()
          })
        }
      }
    }
  ])
  .directive('blockClickPropagation',
    function() {
      return {
        restrict: 'A',
        link: function(scope, element) {
          element.on('click', function(e) {
            e.stopPropagation()
          })
        }
      }
    }
  )
  .directive('appViewRendered',[
    '$timeout', '$location', '$anchorScroll',
    function($timeout, $location, $anchorScroll) {
      var timeout = null

      return {
        restrict: 'A',
        link: function(scope, element) {
          scope.$watch(
            function() {
              return $(element).height()
            },
            function () {
              $timeout.cancel(timeout)
              timeout = $timeout(
                function() {
                  if($location.hash())
                    $anchorScroll()

                  initBootstrapAffixSpies()

                  var body = $('body')
                  if( body.scrollspy )
                    body.scrollspy('refresh')
                },
                300
              )
            }
          )
        }
      }
    }]
  )
  .directive('spyClick',[
    '$location', '$anchorScroll',
    function($location) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.on('click', function(e) {
                  e.stopPropagation()
                  e.preventDefault()

                  $location.hash(attrs.href.substring(1)).replace()
                  $(location).attr('href', '#' + $location.url())
          })
        }
      }
    }]
  )

function initBootstrapAffixSpies () {
  $('[data-spy="affix"]').each(function () {
    var $spy = $(this)
    var data = $spy.data()

    data.offset = data.offset || {}

    if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
    if (data.offsetTop    != null) data.offset.top    = data.offsetTop

    $.fn.affix.call($spy, data)
  })
}
