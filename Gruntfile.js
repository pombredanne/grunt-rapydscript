/*
 * grunt-rapydscript
 * n/a
 *
 * Copyright (c) 2014 loolmeh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/fixtures/*.js']
    },

    // Configuration to be run (and then tested).
    rapydscript: {
        options: {
            IE8: false,
            prettify: true,
            stats: true,
            verbose: true
        },
        compile: {
            files: [
                {src: ['test/fixtures/*.pyj'], expand:true},
            ]
        }
   },
    // sample config for use with grunt-contrib-watch
    watch: {
      scripts: {
        files: ['*.pyj', '**/*.pyj'],
        tasks: ['rapydscript'],
        options: {
          spawn: false,
        }
      }
    },
        // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rapydscript', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
