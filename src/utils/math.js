import * as R from 'ramda';
import log from './log';

export const multiplyByRandom = (num) => R.multiply(Math.random(), num);

export const randomInt = (min = Number.MIN_VALUE) =>
  R.compose(
    R.add(min),
    Math.floor,
    multiplyByRandom,
    R.subtract(R.__, min),
    (max = Number.MAX_VALUE - min) => max
  );

export const randomNaturalWithZero = randomInt(0);
