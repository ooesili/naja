import _ from 'lodash';

function zipper() {
  return function(input = [], varName = "payload") {
    // lets deal with single selection for now
    if (_.isEmpty(input)) { return 'Please select something!'; }
    return _.reduce(input[0].zipper, (accum, key) => {
      return accum + `[${JSON.stringify(key)}]`;
    }, varName);
}};

export default zipper;
