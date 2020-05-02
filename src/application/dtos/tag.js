import * as R from 'ramda';

const notIsNil = R.compose(R.not, R.isNil);

/**
 * Build the tag DTO from a given string
 * @param {String} tag - string
 * @returns {String} - tag dto
 */
const tagDto = R.compose(
  R.ifElse(R.both(notIsNil, R.is(String)), R.identity, () => undefined),
  R.defaultTo(undefined)
);

export default tagDto;
