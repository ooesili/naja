ShowJsonController.$inject = ['jsonData', '$location', 'toolbar', '$scope'];
function ShowJsonController(jsonData, $location, toolbar, $scope) {
  var vm = this;
  vm.json = jsonData;
  // turn toolbar on and off
  toolbar.visible = true;
  toolbar.visibleOnPage = true;
  $scope.$on('$destroy', function() {
    toolbar.visible = false;
    toolbar.visibleOnPage = false;
  });
  // fixture data for development
  if (jsonData.obj === undefined) {
    jsonData.obj = {
      string: "Hello world!",
      array: [
        'Hello',
        'world!',
        {
          arrayObject: {
            arrObjArr: {
              oh: 'yeah',
              emptyArray: [],
            },
            emptyObject: {}
          }
        }
      ],
      subObj: {
        'Hello': 'World!',
        'Quote': '"Test"',
        'Backslash': '\\Back\\slash\\'
      },
      nestedArrays: [
        [1,2,3,4],
        [5,6,7,8],
        [[9],[10]]
      ],
      '<em>injected</em>': '<strong>strong</strong>'
    };
    jsonData.unparsed = JSON.stringify(jsonData.obj);
  }
}

export default ShowJsonController;
