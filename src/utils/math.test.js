import { randomNaturalWithZero, randomInt } from './math';

describe('math:randomNaturalWithZero', () => {
  it('should return a natural number', () => {
    expect.assertions(1);
    expect(randomNaturalWithZero(10)).toBeGreaterThanOrEqual(0);
  });
  it('should return a natural number without params', () => {
    expect.assertions(1);
    expect(randomNaturalWithZero()).toBeGreaterThanOrEqual(0);
  });
});

describe('math:randomInt', () => {
  it('should return a integer number', () => {
    expect.assertions(3);
    expect(randomInt()(-1)).toBeLessThan(0);
    expect(randomInt(1)(10)).toBeGreaterThan(0);
    expect(randomInt(1)(1)).toBe(1);
  });
});
