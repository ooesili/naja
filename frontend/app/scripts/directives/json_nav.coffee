angular.module 'directives'

.directive 'jsonNav', ['$compile', '$templateRequest', '$templateCache',
  ($compile, $templateRequest, $templateCache)->
    scope:
      obj: '='
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs)->
      obj = scope.obj
      # creates the new zippers to map over
      genNewZippers = (zipper, keys)->
        _.map keys, (key)->
          newZipper = _.clone zipper
          newZipper.push key
          newZipper
      # walk the JSON object
      treeWalker = (indent, zipper, shouldAppendComma, shouldPrependKey)->
        # possibly appends a comma to the string
        appendComma = (string)->
          if shouldAppendComma then string + ',' else string
        # possibly prepends the last key to the string
        prependKey = (string)->
          
          if shouldPrependKey then "#{_.last zipper}: #{string}" else string
        # lookup the current subtree
        thisObj = _.reduce zipper, ((accum, key)-> accum[key]), obj
        # array
        if _.isArray thisObj
          # create new zippers for this iteration
          newZippers = genNewZippers zipper, _.times thisObj.length
          # beginning bracket
          result = [[zipper, indent + prependKey '[']]
          # allows us to skip putting a comma on the last element
          lastIndex = newZippers.length - 1
          # recurse over each new zipper
          _.each newZippers, (newZipper, index)->
            treeResults = treeWalker(
              indent + '  '
              newZipper
              index != lastIndex
            )
            result.push treeResults...
          # close the bracket
          result.push [zipper, indent + appendComma ']']
        # object
        else if _.isObject thisObj
          # create new zippers for this iteration
          newZippers = genNewZippers zipper, _.keys thisObj
          # beginning bracket
          result = [[zipper, indent + prependKey '{']]
          # allows us to skip putting a comma on the last element
          lastIndex = newZippers.length - 1
          # recurse over each new zipper
          _.each newZippers, (newZipper, index)->
            treeResults = treeWalker(
              indent + '  '
              newZipper
              index != lastIndex
              true
            )
            result.push treeResults...
          # close the bracket
          result.push [zipper, indent + appendComma '}']
        # scalar
        else
          json = JSON.stringify thisObj
          result = [[zipper, indent + prependKey appendComma json]]
        result
      result = treeWalker '', []
      result = _.map(result, (pair)-> "<div>#{pair[1]}</div>").join('')
      #result = result.join '\n'
      newElement = angular.element "<span>#{result}</span>"
      element.replaceWith newElement
      return
]
