import * as R from 'ramda';

/**
 * Build the tag DTO from a given string
 * @param {String} tag - string
 * @returns {String} - tag dto
 */
const tagDto = R.ifElse(R.is(String), R.identity, () => undefined);

export default tagDto;
