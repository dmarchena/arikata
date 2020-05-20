import { is, isNil } from 'ramda';

export default function isEmpty(value) {
  return isNil(value) || !is(String)(value) || value.length === 0;
}
