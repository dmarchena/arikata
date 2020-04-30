import * as R from 'ramda';

const appendUniqueFromGenerator = (generateDataModelFn) => (arr) => {
  const appendItem = R.ifElse(
    R.includes(R.__, arr),
    () => appendItem(generateDataModelFn()),
    R.append(R.__, arr)
  );
  return appendItem(generateDataModelFn());
};

const arrayLengthEqual = (times) => R.compose(R.equals(times), R.length);

export const uniqDataPopulator = (generateDataModelFn) => (times) =>
  R.until(
    arrayLengthEqual(times),
    appendUniqueFromGenerator(generateDataModelFn),
    []
  );

export const dataPopulator = (generateDataModelFn) =>
  R.times(generateDataModelFn);
