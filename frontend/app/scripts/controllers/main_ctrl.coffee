angular.module 'controllers'

.controller 'MainCtrl', ['$scope', ($scope)->
  $scope.obj =
    string: "Hello world!"
    array: [
      'Hello'
      'world!'
      arrayObject: [
        arrObjArr:
          oh: 'yeah'
      ]
    ]
    subObj:
      'Hello': 'World!'
      'Quote': '"Test"'
      'Backslash': '\\Back\\slash\\'
    nestedArrays: [
      [1,2,3,4]
      [5,6,7,8]
      [[9],[10]]
    ]
    '<em>injected</em>': '<strong>strong</strong>'
]
