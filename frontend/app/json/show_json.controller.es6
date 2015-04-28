ShowJsonController.$inject = ['jsonData', '$location',
                              'toolbarData', '$scope'];
function ShowJsonController(jsonData, $location,
                            toolbarData, $scope) {
  // turn toolbar on and off
  toolbarData.show = true;
  toolbarData.showOnPage = true;
  $scope.$on('$destroy', function() {
    toolbarData.show = false;
    toolbarData.showOnPage = false;
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
  }
  // redirect to 'new' if there is no data to show
  if (jsonData.obj === undefined) {
    $location.path('#/new');
  }
}

export default ShowJsonController;
