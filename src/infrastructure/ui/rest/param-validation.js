import {
  is,
  allPass,
  not,
  isNil,
  isEmpty,
  curry,
  compose,
  defaultTo,
} from 'ramda';

const isStringWithValue = compose(
  allPass([compose(not, isNil), is(String), compose(not, isEmpty)]),
  defaultTo('')
);

const hasReceivedQueryStringParam = curry((param, req) =>
  isStringWithValue(req.query && req.query[param])
);

export { hasReceivedQueryStringParam, isStringWithValue };
