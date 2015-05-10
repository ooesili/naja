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
  vm.keyDown = keyDown;
  // show toolbar
  toolbar.visible = true;
  // fixture data for development
  //if (jsonData.obj === undefined) {
    //vm.json.obj = fixture;
    //vm.json.unparsed = fixtureJSON;
  //}
  return;

  function keyDown(e) {
    //debugger;
    if (jsonData.obj === undefined) { return; }
    switch (e.keyCode) {
      case 37: // left arrow key
      case 72: // h
        jsonData.goLeft();
        e.preventDefault();
        break;
      case 40: // down arrow key
      case 74: // j
      case 'ArrowDown':
        if (e.shiftKey) { jsonData.goNext(); }
        else            { jsonData.goDown(); }
        e.preventDefault();
        break;
      case 38: // up arrow key
      case 75: // k
      case 'ArrowUp':
        if (e.shiftKey) { jsonData.goPrev(); }
        else            { jsonData.goUp(); }
        e.preventDefault();
        break;
      case 39: // right arrow key
      case 76: // l
        jsonData.goRight();
        e.preventDefault();
        break;
    }
  }
}

export default ShowJsonController;
