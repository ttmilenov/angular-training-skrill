require.config({
	baseUrl: './',
    paths: {
        'jasmine-boot':  'lib/jasmine-2.3.4/boot',
        'jashtml':       'lib/jasmine-2.3.4/jasmine-html',
        'jasmine':       'lib/jasmine-2.3.4/jasmine',            
        'angular':       'node_modules/angular/angular.min',           
        'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
        'jquery':        'node_modules/jquery/dist/jquery.min',
        'angular-route': 'node_modules/angular-route/angular-route.min',
        'bootstrap':     'node_modules/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap':  'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min',
        'app':           'src/scripts/app',           
        'runSpecs':      'spec/runSpecs',
    },
    shim: {
    	'bootstrap':     { deps: ['jquery'] },
        'angular-route': { deps: ['angular'] },
        'ui-bootstrap':  { deps: ['angular'] },
        'jashtml': 		 { deps: ['jasmine'] },
        'jasmine-boot':  { deps: ['jasmine', 'jashtml'] },
        'angular':       { deps: ['jquery'], },            
        'angular-mocks': { exports: 'ngMock', deps: ['angular'] },
        'app': 			 { deps: ['bootstrap', 'ui-bootstrap'] },
        'runSpecs':      { deps: ['angular-mocks', 'app'] }
    }
});

require(['jasmine-boot'], function () {
    require(['runSpecs']);
});