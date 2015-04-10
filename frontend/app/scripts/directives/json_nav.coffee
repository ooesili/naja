angular.module 'directives'

.directive 'jsonNav', ['$compile', ($compile)->
  scope:
    obj: '='
  template: '<div></div>'
  restrict: 'E'
  link: (scope, element, attrs)->
    obj = scope.obj
    # creates the new zippers to map over
    eachNewZipper = (zipper, keys, callback)->
      lastIndex = keys.length - 1
      _.each keys, (key, index)->
        newZipper = _.clone zipper
        newZipper.push key
        callback newZipper, key, index is lastIndex
        return
      return
    # walk the JSON object
    treeWalker = (indent, zipper, depth, shouldAppendComma, shouldPrependKey)->
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
        # beginning bracket
        thisIterResult = [[zipper, indent + prependKey '[']]
        thisTreeResult = {tree: [], depth: depth}
        # recurse over each new zipper
        eachNewZipper zipper, _.times(thisObj.length),
          (newZipper, index, isLast)->
            [treeResult, iterResult] = treeWalker(
              indent + '  '
              newZipper
              depth + 1
              isLast
            )
            thisTreeResult.tree.push treeResult
            thisIterResult.push iterResult
            return
        # close the bracket
        thisIterResult.push [zipper, indent + appendComma ']']
        result = [thisTreeResult, thisIterResult]
      # object
      else if _.isObject thisObj
        # beginning bracket
        thisIterResult = [[zipper, indent + prependKey '{']]
        thisTreeResult = {tree: {}, depth: depth}
        # recurse over each new zipper
        eachNewZipper zipper, _.keys(thisObj),
          (newZipper, key, isLast)->
            [treeResult, iterResult] = treeWalker(
              indent + '  '
              newZipper
              depth + 1
              isLast
              true
            )
            thisTreeResult.tree[key] = treeResult
            thisIterResult.push iterResult...
        # close the bracket
        thisIterResult.push [zipper, indent + appendComma '}']
        result = [thisTreeResult, thisIterResult]
      # scalar
      else
        json = JSON.stringify thisObj
        thisIterResult = [[zipper, indent + prependKey appendComma json]]
        thisTreeResult = {depth: depth}
        result = [thisTreeResult, thisIterResult]
      result
    result = treeWalker '', [], 0
    newElement = angular.element "<span>#{JSON.stringify result, null, 2}</span>"
    element.replaceWith newElement
    return
]
