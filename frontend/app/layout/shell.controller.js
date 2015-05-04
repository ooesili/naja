ShellController.$inject = ['jsonData', 'toolbar'];
function ShellController(jsonData, toolbar) {
  var vm = this;
  // shared data
  vm.toolbar = toolbar;
  vm.json = jsonData;
  // functions
  vm.keyDown = keyDown;

  function keyDown(e) {
    if (jsonData.obj !== undefined) {
      switch (e.key) {
        case 'h':
        case 'ArrowLeft':
          jsonData.goLeft();
          e.preventDefault();
          break;
        case 'j':
        case 'J':
        case 'ArrowDown':
          if (e.shiftKey) { jsonData.goNext(); }
          else            { jsonData.goDown(); }
          e.preventDefault();
          break;
        case 'k':
        case 'K':
        case 'ArrowUp':
          if (e.shiftKey) { jsonData.goPrev(); }
          else            { jsonData.goUp(); }
          e.preventDefault();
          break;
        case 'l':
        case 'ArrowRight':
          jsonData.goRight();
          e.preventDefault();
          break;
      }
    }
  }
}

export default ShellController;
