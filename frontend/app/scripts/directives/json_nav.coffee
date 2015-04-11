angular.module 'directives'

.directive 'jsonView', ['$compile', ($compile)->
  scope:
    obj: '='
  template: '<div></div>'
  restrict: 'E'
  link: (scope, element, attrs)->
    # walk the object and return the data structures we need
    treeWalker = (topObject)->
      lines = []
      go = (zipper, isLast, upperKey)->
        # append a comma to a string if isLast is true
        maybePrependKey = (string)->
          if upperKey then "#{JSON.stringify upperKey}: #{string}" else string
        maybeAddComma = (string)->
          if isLast then string else string + ','
        # used for indetation and is passed into the tree structure
        depth = zipper.length
        # indentation and a method to indent a string
        indentation = _.repeat '  ', depth
        indent = (string)->
          indentation + string
        # unzip object from tree
        thisObject = _.reduce zipper, (accum, key)->
          accum[key]
        , topObject
        # figure out the type
        isObject = _.isObject thisObject
        isArray = _.isArray thisObject
        # object or array
        if isObject
          # before recursion
          if isArray
            startLine = '['
            keys = _.times thisObject.length
          else
            startLine = '{'
            keys = _.keys thisObject
          formattedStartLine = indent maybePrependKey startLine
          lines.push "<div>#{formattedStartLine}"
          # recursion
          lastIndex = keys.length - 1
          _.each keys, (key, index)->
            newZipper = _.clone zipper
            newZipper.push key
            if isArray
              go newZipper, index == lastIndex
            else
              go newZipper, index == lastIndex, key
          # after recursion
          if isArray
            endLine = ']'
          else
            endLine = '}'
          formattedEndLine = indent maybeAddComma endLine
          lines.push "#{formattedEndLine}</div>"
        # scalar
        else
          line = indent maybePrependKey maybeAddComma JSON.stringify thisObject
          lines.push "<div>#{line}</div>"
          #lines.push line
        return
      go []
      lines
    # compile and insert the element into the DOM
    jsonLines = treeWalker scope.obj
    newElement = angular.element "<pre>#{jsonLines.join('')}</pre>"
    $compile(newElement)(scope)
    element.replaceWith newElement
    return
]

$ ->
  divs = $('pre div')
  divs.on 'mouseover', (e)->
    e.stopPropagation()
    $(this).addClass('selected')
  divs.on 'mouseout', (e)->
    e.stopPropagation()
    $(this).removeClass('selected')
