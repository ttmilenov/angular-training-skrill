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
      files: ['css', 'js']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      build: {
        files: {
          'src/_pracxs.js': ['src/_pracxs.bower.js', 'src/js/*.js'] 
        }
      },
    },
	cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/pracxs.min.css': ['src/_pracxs.css'],
        }
      }
    },
    uglify: {
	  all: {
		options: {
		  mangle: true,
		  compress: {}
		},
		files: {
		  'js/pracxs.min.js': 'src/_pracxs.js',
		}
	  },
      options: {
        banner: '<%= banner %>'
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
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    /*watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },*/
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
            changeOrigin: false,
	      }
        ],
	  },
	},
	bower_concat: {
	  all: {
		dest: 'src/_pracxs.bower.js',
		include: [
          'jquery',       
          'angular',
		  'bootstrap',
		  'angular-bootstrap',
		  'angular-route',
		  'angular-bootstrap'
        ],
        dependencies: {
        	'angular': 'jquery',
        	'angular-bootstrap': ['angular', 'bootstrap']
        },
		bowerOptions: {
		  relative: false
		}
	  }
	},
	less: {
      all: {
        files: {
          "src/_pracxs.css": "src/less/pracxs.less"
        }
      },
    },
	watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.less'],
        tasks: ['build'],
        options: {
          spawn: false,
		  debounceDelay: 250,
        },
      },
    },
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-connect');
  //grunt.loadNpmTasks('grunt-connect-proxy');
  //grunt.loadNpmTasks('grunt-bower-concat');
  require('load-grunt-tasks')(grunt); // auto load all grunt plugins

  // Default task.
  grunt.registerTask('default', ['bower_concat', 'jshint', 'qunit', 'clean', 'concat', 'uglify' , 'less:all', 'cssmin']);
  
  grunt.registerTask('build', ['bower_concat', 'concat', 'uglify', 'less:all', 'cssmin']);
  
  grunt.registerTask('watchscr', ['watch:scripts']);
  
  grunt.registerTask('server', [
	'configureProxies:server',
	'connect:server',
  ]);
};
