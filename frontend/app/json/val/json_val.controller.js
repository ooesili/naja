import _ from 'lodash';

JsonValController.$inject = ['$scope', 'jsonData', '$filter'];
function JsonValController($scope, jsonData, $filter) {
  var vm = this;
  vm.data = jsonData;
  $scope.$watch('vm.data.selectedStateObject', function() {
    if (jsonData.selectedStateObject) {
      var zipper = jsonData.selectedStateObject.zipper;
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
