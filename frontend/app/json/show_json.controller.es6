ShowJsonController.$inject = ['jsonData', '$location'];
function ShowJsonController(jsonData, $location) {
  if (jsonData.obj === undefined) {
    // fixture data for development
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
