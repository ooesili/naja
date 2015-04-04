path = require('path')

module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON './package.json'
    ########### DIRECTORY LAYOUT ###########
    layout:
      scripts:
        coffee: 'app/scripts'
        vendor: [
          'bower_components/jquery/dist/jquery.js'
          'bower_components/angular/angular.js'
          'bower_components/lodash/lodash.js'
        ]
      styles:
        sass: ['app/styles']
      views:
        jade: 'app/views'
      public: ['public/*']
    ########### COFFEESCRIPT ###########
    coffee:
      app:
        options: bare: true
        files:
          '../public/assets/scripts/app.js': [
            '<%= layout.scripts.coffee %>/app.coffee',
            '<%= layout.scripts.coffee %>/**/*.coffee'
          ]
    ########### FILE COPY ###########
    copy:
      jsLibs:
        expand: true
        flatten: true
        src: ['<%= layout.scripts.vendor %>']
        dest: '../public/assets/scripts/'
        ext: '.js'
      public:
        expand: true
        src: ['public/*']
        dest: '../'
    ########### JADE ###########
    jade:
      index:
        options:
          data:
            production: process.env.NODE_ENV == 'production'
        expand: true
        cwd: '<%= layout.views.jade %>'
        src: ['**/*.jade']
        ext: '.html'
        dest: '../public'
    ########### SASS ###########
    sass:
      stylesheets:
        options:
          sourcemap: 'none'
        files:
          '../public/assets/css/app.css':
            ['<%= layout.styles.sass %>/**/*.scss']
    ########### WATCH ###########
    watch:
      sass:
        files: ['<%= layout.styles.sass %>/**/*.scss']
        tasks: ['sass']
      jade:
        files: ['<%= layout.views.jade %>/**/*.jade']
        tasks: ['jade']
      public:
        files: ['<%= copy.public.src %>']
        tasks: ['copy:public']
      coffee:
        files: ['<%= layout.scripts.coffee %>/**/*.coffee']
        tasks: ['coffee']
      gruntfile:
        files: ['Gruntfile.coffee']
        tasks: ['build']
    ########### UGLIFY ###########
    uglify:
      js: files:
        '../public/assets/scripts/app.js':
          '../public/assets/scripts/app.js'
  ########### PLUGIN LOADING ###########
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  ########### TASK REGISTRATION ###########
  grunt.registerTask 'default', ['build', 'watch']
  grunt.registerTask 'build', ['coffee', 'copy', 'jade', 'sass']
  grunt.registerTask 'heroku', ['build', 'uglify']

# used to uglify files in place
identityKeys = (keys)->
  obj = {}
  keys.forEach (key)->
    obj[key] = key
  return obj
