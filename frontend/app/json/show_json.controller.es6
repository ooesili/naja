ShowJsonController.$inject = ['jsonData', '$location'];
function ShowJsonController(jsonData, $location) {
  // redirect to 'new' if there is no data to show
  if (jsonData.obj === undefined) {
    $location.path('#/new');
  }
}

export default ShowJsonController;
