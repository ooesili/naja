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
      stateList = []
      go = (zipper, isLast, upperKey)->
        # prepend a upperKey to a string if upperKey is given
        maybePrependKey = (string)->
          if upperKey then "#{JSON.stringify upperKey}: #{string}" else string
        # append a comma to a string if isLast is true
        maybeAddComma = (string)->
          if isLast then string else string + ','
        # div for this object, with event and class bindings
        prependDiv = (string)->
          "<div ng-class=\"{
            hovered: stateList[#{stateListIndex}].hovered,
            selected: stateList[#{stateListIndex}].selected
            }\"
            ng-mousedown=\"select(#{stateListIndex}, $event)\"
            ng-mouseover=\"hover(#{stateListIndex}, $event)\"
            ng-mouseout=\"hover(#{stateListIndex}, $event)\"
            >#{string}"
        # used for indetation and is passed into the tree structure
        depth = zipper.length
        # create this part of the state tree
        thisStateObject =
          hovered: false
          selected: false
          zipper: zipper
        # # push it to the flat list
        stateListIndex = stateList.push(thisStateObject) - 1
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
            thisStateObject.tree = []
          else
            startLine = '{'
            keys = _.keys thisObject
            thisStateObject.tree = {}
          formattedStartLine = indent maybePrependKey startLine
          lines.push prependDiv formattedStartLine
          # recursion
          lastIndex = keys.length - 1
          _.each keys, (key, index)->
            newZipper = _.clone zipper
            newZipper.push key
            if isArray
              returnedStateObject = go newZipper, index == lastIndex
              thisStateObject.tree.push returnedStateObject
            else
              returnedStateObject = go newZipper, index == lastIndex, key
            thisStateObject.tree[key] = returnedStateObject
            return
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
          lines.push prependDiv "#{line}</div>"
        thisStateObject
      stateTree = go [], true
      [lines, stateTree, stateList]
    # compile and insert the element into the DOM
    [jsonLines, stateTree, scope.stateList] = treeWalker scope.obj
    newElement = angular.element "<pre>#{jsonLines.join('')}</pre>"
    $compile(newElement)(scope)
    element.replaceWith newElement
    # set up scope callbacks
    # select an object via view interaction
    scope.select = (stateListIndex, $event)->
      $event.stopPropagation()
      # deselect previously selected state objects
      _.each scope.selectedStateObjects, (stateObject)->
        stateObject.selected = false
      scope.selectedStateObjects = []
      # selecte this object
      stateObject = scope.stateList[stateListIndex]
      stateObject.selected = true
      scope.selectedStateObjects.push stateObject
    # hover over an object
    scope.hover = (stateListIndex, $event)->
      $event.stopPropagation()
      stateObject = scope.stateList[stateListIndex]
      # mouse over
      if $event.type is 'mouseover'
        stateObject.hovered = true
      # mouse out
      else
        stateObject.hovered = false
    return
]
