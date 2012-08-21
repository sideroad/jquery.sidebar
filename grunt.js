/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    testem : {
        browsers : [],
        files : [
          'test/jquery.sidebar.html'
        ]
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['dist/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.min.js'
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
      tasks: 'lint qunit'
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
    },
    uglify: {}
  });

  // Default task.
  grunt.loadNpmTasks('grunt-testem');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.registerTask('default', 'testem concat min');

};
