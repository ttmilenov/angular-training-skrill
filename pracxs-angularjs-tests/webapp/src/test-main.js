var allTestFiles = ['app'];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  // baseUrl: './base',
  baseUrl: 'http://localhost:9876/base',
  
  paths: {
    'angular':       'node_modules/angular/angular.min',           
    'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
    'jquery':        'node_modules/jquery/dist/jquery.min',
    'angular-route': 'node_modules/angular-route/angular-route.min',
    'bootstrap':     'node_modules/bootstrap/dist/js/bootstrap.min',
    'ui-bootstrap':  'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min',
    'app':           'src/scripts/app',
  },
  shim: {
    'bootstrap':     { deps:['jquery'] },
    'angular-route': { deps:['angular'] },
    'ui-bootstrap':  { deps:['angular'] },
    'angular':       { deps:['jquery', 'bootstrap'] },            
    'angular-mocks': { exports: 'ngMock', deps: ['angular'] },
    'app': 	         { deps: ['ui-bootstrap', 'angular', 'angular-route', 'angular-mocks'] },
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
