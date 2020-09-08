const util = require('util');

// Debug response.
module.exports = obj => {
  // eslint-disable-next-line no-console
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true }),
  );
};
