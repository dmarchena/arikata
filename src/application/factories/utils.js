const hasGetterResultValue = (result) => {
  let hasValue = result ?? false;
  if (hasValue && Array.isArray(result) && result.length === 0) {
    hasValue = false;
  }
  return hasValue;
};

const composedSetter = (composables, method) => (...args) =>
  composables.reduce((_, item) => item[method](...args), undefined);

const composedGetter = (composables, method, defaultResult = false) => (
  ...args
) => {
  let result;
  composables.some((item) => {
    result = item[method](...args) ?? defaultResult;
    return hasGetterResultValue(result);
  });
  return result;
};

const composedGetterAsync = (
  composables,
  method,
  defaultResult = false
) => async (...args) => {
  let result = Promise.resolve(defaultResult);
  for (let i = 0; i < composables.length; i += 1) {
    // We don't want to parallelize calls, do needed ones only instead.
    // eslint-disable-next-line no-await-in-loop
    const partialRes = await composables[i][method](...args).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.message);
      return false;
    });
    if (hasGetterResultValue(partialRes)) {
      result = partialRes;
      break;
    }
  }
  return result;
};

const composedSetterAsync = (composables, method) => (...args) =>
  composables.reduce(
    (_, item) =>
      item[method](...args).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }),
    undefined
  );

const isRequired = (name) => {
  throw new Error(`function "${name}" is required for Application Service`);
};

export {
  composedGetter,
  composedGetterAsync,
  composedSetter,
  composedSetterAsync,
  isRequired,
};
