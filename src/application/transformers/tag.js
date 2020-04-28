import * as R from 'ramda';

const isModel = R.propIs(String, 'tag');
const isArray = R.is(Array);

const tagDto = R.cond([
  [isModel, R.prop('tag')],
  [
    isArray,
    R.compose(
      R.filter(R.not(R.isNil)),
      R.map((t) => tagDto(t))
    ),
  ],
  [R.T, R.identity],
]);

export default tagDto;
