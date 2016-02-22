'use strict';

module.exports = function(grunt) {
  // After running "npm install connect serve-static --save-dev" to add connect as a dev dependency of your project, you can require it in your gruntfile with:
  var serveStatic = require('serve-static');
  // After running "npm install grunt-connect-proxy --save-dev" to add connect as a dev dependency of your project, you can require it in your gruntfile with:
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['css']
    },
	cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/pracxs.min.css': ['src/pracxs.css'],
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: false, src: ['node_modules/scriptjs/dist/script.min.js'], dest: 'js/script.min.js', filter: 'isFile'},
          {expand: false, src: ['node_modules/jquery/dist/jquery.min.js'], dest: 'js/jquery.min.js', filter: 'isFile'},
          {expand: false, src: ['node_modules/angular/angular.min.js'], dest: 'js/angular.min.js', filter: 'isFile'},
          {expand: false, src: ['node_modules/angular-route/angular-route.min.js'], dest: 'js/angular-route.min.js', filter: 'isFile'},
          {expand: false, src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'], dest: 'js/bootstrap.min.js', filter: 'isFile'},
          {expand: false, src: ['node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js'], dest: 'js/ui-bootstrap-tpls.min.js', filter: 'isFile'},
        ],
      },
    },
	connect: {
      server: {
	    options: {
          port: 9000,
		  hostname: 'localhost',
          keepalive: true,
		  base: {
            path: '.',
            options: {
              index: 'index2.html',
              maxAge: 300000
            }
          },
		  middleware: function (connect, options) {
            return [
              // Include the proxy first 
              proxySnippet,
              // Serve static files. 
              serveStatic(".")
              // Make empty directories browsable. 
              // connect.directory(options.base)
            ];
          },
        },
        proxies: [
	      {
            context: '/rest',
            host: 'localhost',
            port: 8080,
            https: false,
            changeOrigin: false
	      }
        ],
	  },
	},
	less: {
      all: {
        files: {
          "src/pracxs.css": "less/pracxs.less"
        }
      },
    },
	watch: {
      scripts: {
        files: ['js/*.*', 'less/pracxs.less'],
        tasks: ['build'],
        options: {
          spawn: false,
		  debounceDelay: 250,
        },
      },
    },
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt); // auto load all grunt plugins

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
  
  grunt.registerTask('build', ['copy', 'less:all', 'cssmin']);
  
  grunt.registerTask('watchscr', ['watch:scripts']);
  
  grunt.registerTask('server', [
	'configureProxies:server',
	'connect:server',
  ]);
};
