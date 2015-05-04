var fixture = {
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

var fixtureJSON = JSON.stringify(fixture);


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
    vm.json.obj = fixture;
    vm.json.unparsed = fixtureJSON;
  }
}

export default ShowJsonController;
