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
      files: ['css','js']
    },
	cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/pracxs.min.css': ['src/_bower.css'],
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      options: {
        jshintrc: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['scripts/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
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
            context: '/rest/menu',
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
          "src/_bower.css": "less/pracxs.less"
        }
      },
    },
    requirejs: {
      compile: {
        options: {
          name: 'scripts/main',
          baseUrl: "./",
          findNestedDependencies: true,
          mainConfigFile : "scripts/main.js",
          out: "js/pracxs.min.js",
          preserveLicenseComments: false,
          // inlineText : true,
          paths: {
        	  requireJs: "node_modules/almond/almond",
          },
          include: [
              "requireJs"
          ],
        }
      }
    },
	watch: {
      scripts: {
        files: ['scripts/*.*', 'less/*.*'],
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
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'requirejs', 'less:all', 'cssmin']);
  
  grunt.registerTask('build', ['less:all', 'cssmin', 'requirejs']);
  
  grunt.registerTask('watch', ['watch:scripts']);
  
  grunt.registerTask('server', [
	'configureProxies:server',
	'connect:server',
  ]);
};
