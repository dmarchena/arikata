/* eslint no-underscore-dangle: ["error", { "allow": ["__"] }] */

import * as R from 'ramda';

const appendUniqueFromGenerator = (generateDataModelFn) => (arr) => {
  const appendItem = R.ifElse(
    R.includes(R.__, arr),
    () => appendItem(generateDataModelFn()),
    R.append(R.__, arr)
  );
  return appendItem(generateDataModelFn());
};

const arrayLengthEq = (times) => R.compose(R.equals(times), R.length);

export const uniqPopulator = (generateDataModelFn) => (times) =>
  R.until(
    arrayLengthEq(times),
    appendUniqueFromGenerator(generateDataModelFn),
    []
  );

export const populator = (generateDataModelFn) => R.times(generateDataModelFn);
