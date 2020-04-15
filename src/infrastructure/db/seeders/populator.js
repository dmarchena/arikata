const R = require('ramda');

const rangeWithLength = R.range(0);

const populator = (generateDataModelFn) =>
  R.compose(R.map(generateDataModelFn), rangeWithLength);

module.exports = populator;
