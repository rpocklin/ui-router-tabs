'use strict';

module.exports = function(grunt) {

  var beautifyFiles = ['!Gruntfile.js', '!npm-shrinkwrap.json', 'src/**/*.{html,js}', '!app/bower_components/**/*'];

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    connect: {
             server: {
               options: {
                 port: 9000
               }
             }
    },

    watch: {
           scripts: {
                    files: ['src/**/*'],
                    tasks: ['jshint', 'karma'],
                    options: {
                             spawn: false
                    }
           }

    },

    // verifies we have formatted our js and HTML according to our style conventions
    jsbeautifier: {
      verify : {
        src:   beautifyFiles,
        options: {
          config: '.jsbeautifyrc',
          mode: 'VERIFY_ONLY'
        }
      },
      update: {
        src:   beautifyFiles,
        options: {
          config: '.jsbeautifyrc'
        }
      }

    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      src:     ['src/!(*spec).js']
    },

    // Test settings
    karma: {
      unit: {
        options:    {
          logLevel: 'DEBUG'
        },
        browsers:   ['PhantomJS'],
        configFile: 'karma.conf.js',
        singleRun:  true,
        autoWatch:  false
      }
    },
    coveralls: {
      options: {
        coverage_dir:'coverage',
        directory:'coverage/lcov.info',
        debug: true,
        dryRun: false,
        recursive: false
      }
    }
  });

  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('beautify', ['jsbeautifier:update']);
  grunt.registerTask('default', [
    'jsbeautifier:verify', 'jshint', 'karma', 'coveralls'
  ]);
};
