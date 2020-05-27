import { is, isNil } from 'ramda';

const isEmptyString = (value) =>
  isNil(value) || !is(String)(value) || value.length === 0;

// eslint-disable-next-line import/prefer-default-export
export { isEmptyString };
