Toolbar.$inject = ['$timeout'];
function Toolbar($timeout) {
  var toolbar = this;
  var toolbarPromise = null;
  toolbar.cancelShow = cancelShow;
  toolbar.show = show;
  return;

  function cancelShow() {
    if (toolbarPromise) {
      $timeout.cancel(toolbarPromise);
    }
  }

  function show() {
    if (toolbar.visibleOnPage) {
      toolbarPromise = $timeout(function() {
        toolbar.visible = true;
      }, 800);
    }
  }
}

export default Toolbar;
