import { compose, add, multiply, subtract, __, defaultTo } from 'ramda';

export const multiplyByRandom = (num) => multiply(Math.random(), num);

export const randomInt = (min) =>
  compose(
    add(min),
    Math.floor,
    multiplyByRandom,
    subtract(__, min),
    defaultTo(Number.MAX_SAFE_INTEGER)
  );

export const randomNaturalWithZero = randomInt(0);
