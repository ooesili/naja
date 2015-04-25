NewJsonController.$inject = ['jsonData', '$location'];
function NewJsonController(jsonData, $location) {
  var vm = this;
  vm.parse = parse;
  vm.data = jsonData;
  return;

  function parse() {
    var parsed;
    // try to parse the input
    try {
      parsed = JSON.parse(vm.data.unparsed);
    } catch (e) {
      console.log("An error occured while parsing your input");
      return;
    }
    // set data and redirect
    jsonData.obj = parsed;
    $location.path('/show');
  }
}

export default NewJsonController;
