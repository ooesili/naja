import _ from 'lodash';

function jsonEsc() {
  return (input => _.escape(JSON.stringify(input)));
};

export default jsonEsc;
