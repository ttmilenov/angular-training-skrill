/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

 require.config({
   baseUrl: './',
   shim: {
     bootstrap:       { "deps" :['jquery'] },
     angular:         { "deps" :['jquery'] },
     'angular-route': { "deps" :['angular'] },
     'ui-bootstrap':  { "deps" :['angular'] },
   },
   paths: {
     jquery:          'node_modules/jquery/dist/jquery.min',
     angular:         'node_modules/angular/angular.min',
     'angular-route': 'node_modules/angular-route/angular-route.min',
     bootstrap:       'node_modules/bootstrap/dist/js/bootstrap.min',
     'ui-bootstrap':  'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min',
   },
   out: "js/pracxs.min.js",
 })

require([
  'bootstrap',
  'ui-bootstrap',
  'scripts/app',
], function() {
  // when all is done, execute bootstrap angular application
  angular.bootstrap(document, ['pracxsApp'])
})
