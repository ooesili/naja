angular.module 'directives'

.directive 'jsonNav', ['$compile', ($compile)->
  # object to return
  scope:
    obj: '='
    zipper: '=?'
    indent: '=?'
  template: '<div></div>'
  restrict: 'E'
  link: (scope, element, attrs)->
    ##### INITIALIZATION #####
    indent = scope.indent or ''
    scope.newIndent = indent + '  '
    scope.zipper ||= []
    thisObj = _.reduce scope.zipper, (accum, key)->
      accum[key]
    , scope.obj
    # begin assembling the HTML
    html = '<span>'
    ##### ARRAY #####
    if _.isArray thisObj
      # create a zipper for each value
      scope.newZippers = _.times thisObj.length, (index)->
        newZipper = _.clone scope.zipper
        newZipper.push index
        newZipper
      # assemble html
      html += '<span>[</span>\n'
      html += '<span ng-repeat="newZipper in newZippers">'
      html += indent
      html += '  <json-nav obj="obj" zipper="newZipper" '
      html += 'indent="newIndent">'
      html += '</json-nav><span ng-if="!$last">,</span>\n'
      html += "</span>"
      html += "#{indent}]"
    ##### OBJECT #####
    else if _.isObject thisObj
      # create a zipper for each value
      scope.newZippers = _.map _.keys(thisObj), (key)->
        newZipper = _.clone scope.zipper
        newZipper.push key
        newZipper
      # to grab the current key from the zipper
      scope.last = _.last
      html += '{\n'
      html += '<span ng-repeat="newZipper in newZippers">'
      html += indent
      html += '  {{last(newZipper) | json}}: '
      html += '<json-nav obj="obj" zipper="newZipper"'
      html += 'indent="newIndent">'
      html += '</json-nav><span ng-if="!$last">,</span>\n'
      html += '</span>'
      html += "#{indent}}"
    ##### SCALAR #####
    else
      html += '<span ng-class="{red:selected}" ng-click="select($event)">'
      html += JSON.stringify thisObj
      html += '</span>'
    html += '</span>'
    # create, compile and insert the the new element
    newElement = angular.element html
    $compile(newElement)(scope)
    element.replaceWith newElement
    ##### SELECT/HOVER #####
    scope.select = (event)->
      event.stopPropagation()
      setTimeout ->
        lookup = _.reduce scope.zipper, (accum, key)->
          accum + "[#{JSON.stringify key}]"
        , 'payload'
        alert lookup
      , 0
    return
]
