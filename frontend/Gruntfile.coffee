path = require('path')

module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON './package.json'
    ########### DIRECTORY LAYOUT ###########
    layout:
      scripts:
        coffee: 'app/scripts'
        vendor: vendorify('assets/scripts',
          'bower_components/jquery/dist/jquery.js':
            "https://code.jquery.com/jquery-2.1.3.min.js"
          'bower_components/angular/angular.js':
            "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js"
          'bower_components/lodash/lodash.js':
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"
        )
      styles:
        sass: ['app/styles']
      views: 'app/views'
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
        src: ['<%= layout.scripts.vendor.src %>']
        dest: '../public/assets/scripts/'
        ext: '.js'
      html:
        expand: true
        cwd: '<%= layout.views %>'
        src: ['**/*.html']
        dest: '../public'
      public:
        expand: true
        src: ['public/*']
        dest: '../'
    ########### JADE ###########
    jade:
      index:
        options:
          data:
            vendorScripts: '<%= layout.scripts.vendor.dest %>'
        expand: true
        cwd: '<%= layout.views %>'
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
        files: ['<%= layout.views %>/**/*.jade']
        tasks: ['jade']
      html:
        files: ['<%= layout.views %>/**/*.html']
        tasks: ['copy:html']
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
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-sass'
  ########### TASK REGISTRATION ###########
  grunt.registerTask 'default', ['build', 'watch']
  grunt.registerTask 'build', ['copy', 'coffee', 'jade', 'sass']
  grunt.registerTask 'heroku', ['build', 'uglify']

# allow easy specification of CDN alternatives for production
vendorify = (destDir, mapping)->
  src = []
  remote = []
  dest = []
  # parse key value pairs from the mapping
  for key in Object.keys(mapping)
    src.push key
    remote.push mapping[key]
    dest.push "#{destDir}/#{path.basename key}"
  # decide whether or not we should use CDNs
  dest = remote if process.env.NODE_ENV is 'production'
  {src: src, dest: dest}
