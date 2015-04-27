import _ from 'lodash';

JsonValController.$inject = ['$scope', 'jsonData', '$filter'];
function JsonValController($scope, jsonData, $filter) {
  var vm = this;
  vm.data = jsonData;
  $scope.$watch('vm.data.selectedStateObjects', function() {
    if (jsonData.selectedStateObjects[0]) {
      var zipper = jsonData.selectedStateObjects[0].zipper;
      vm.result = $filter('json')(unzipTree(zipper, jsonData.obj));
    }
    else {
      vm.result = "Please select something";
    }
  });
}

function unzipTree(zipper, obj) {
  return _.reduce(zipper, function(accum, key) {
    return accum[key];
  }, obj);
}

export default JsonValController;
