angular.module 'directives'

.directive 'jsonNav', ['$compile', '$templateRequest', '$templateCache',
  ($compile, $templateRequest, $templateCache)->
    # helper method for grabbing templates
    getTemplate = (name, callback)->
      # we use this in two places
      url = "directives/json_nav/#{name}.html"
      # resolve the promise and call the callback
      $templateRequest(url, false).then ->
        response = $templateCache.get url
        template = if response[3] is 'OK'
          response[1]
        else
          'There was a problem fetching data from the server'
        callback(template)
    # compiles a template and inserts it into the dom
    compileAndReplace = (element, scope)->
      (template) ->
        # remove the newline from the end of the file
        template = _.trimRight template
        # create and compile the lement
        newElement = angular.element "<span>#{template}</span>"
        $compile(newElement)(scope)
        # insert it into the DOM
        element.replaceWith newElement
    # object to return
    scope:
      obj: '='
      zipper: '=?'
      indent: '=?'
    template: '<div></div>'
    terminal: true
    restrict: 'E'
    link: (scope, element, attrs)->
      ##### INITIALIZATION #####
      scope.indent = '' if not scope.indent?
      scope.newIndent = scope.indent + '  '
      scope.zipper ||= []
      scope.thisObj = _.reduce scope.zipper, (accum, key)->
        accum[key]
      , scope.obj
      ##### OBJECT OR ARRAY #####
      if _.isObject scope.thisObj
        ##### ARRAY #####
        if _.isArray scope.thisObj
          templateName = 'array'
          newZipperEnds = _.times scope.thisObj.length
        ##### OBJECT #####
        else
          newZipperEnds = _.keys(scope.thisObj)
          templateName = 'object'
          # to grab the current key from the zipper
          scope.last = _.last
        scope.newZippers = _.map newZipperEnds, (key)->
          newZipper = _.clone scope.zipper
          newZipper.push key
          newZipper
      ##### SCALAR #####
      else
        templateName = 'scalar'
      getTemplate templateName, compileAndReplace(element, scope)
      #scope.select = (event)->
        #event.stopPropagation()
        #setTimeout ->
          #lookup = _.reduce scope.zipper, (accum, key)->
            #accum + "[#{JSON.stringify key}]"
          #, 'payload'
          #alert lookup
        #, 0
      return
]
