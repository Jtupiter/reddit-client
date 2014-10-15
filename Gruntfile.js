module.exports = function (grunt) {

  var jsLibFiles = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/bootstrap/dist/js/bootstrap.js'
  ];

  // Even though only one css library, set up incase more in future.
  var cssFiles = [
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ];

  // Project configuration.
  grunt.initConfig({
    cssmin: {
      main: {
        files: {
          'public/libs.css': cssFiles
        }
      }
    },
    uglify: {
      main: {
        files: {
          'public/libs.js': jsLibFiles
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: jsLibFiles,
        dest: 'public/libs.js',
      },
      css: {
        src: cssFiles,
        dest: 'public/libs.css'
      }
    },
    watch: {
      main: {
        files: ['public/**/*'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['cssmin', 'uglify']);
  grunt.registerTask('debug', ['concat'])
};
