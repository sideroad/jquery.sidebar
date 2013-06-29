/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    testem : {
      options: {
        launch_in_ci: [
          'PhantomJS'
        ]
      },
      main: {
        files: {
          'tests.tap': [
            'test/*.html'
          ]
        }
      }
    },
    concat: {
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },
    'qunit-cov': {
      test:{
        minimum: 0.9,
        srcDir: 'src',
        depDirs: ['lib', 'test', 'css'],
        outDir: 'cov',
        testFiles: ['test/*.html']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    }
  });

  // Default task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-qunit-cov');
  grunt.loadNpmTasks('grunt-testem');
  grunt.loadNpmTasks('grunt-devtools');
  grunt.registerTask('default', ['testem', 'qunit-cov', 'concat', 'min']);
  grunt.registerTask('jenkins', ['testem', 'qunit-cov', 'concat', 'min']);
  grunt.registerTask('travis', ['testem', 'concat', 'min']);

};
