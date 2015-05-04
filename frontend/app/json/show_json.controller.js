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


ShowJsonController.$inject = ['jsonData', 'toolbar'];
function ShowJsonController(jsonData, toolbar) {
  var vm = this;
  vm.json = jsonData;
  vm.toolbar = toolbar;
  // show toolbar
  toolbar.visible = true;
  // fixture data for development
  if (jsonData.obj === undefined) {
    vm.json.obj = fixture;
    vm.json.unparsed = fixtureJSON;
  }
}

export default ShowJsonController;
