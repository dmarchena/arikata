import kataDto from './kata';

describe('kata DTO', () => {
  it('should throw an error if it is called without params', () => {
    expect.assertions(1);
    expect(() => {
      kataDto();
      // eslint-disable-next-line jest/require-to-throw-message
    }).toThrow();
  });
  it('should return an object', () => {
    expect.assertions(1);
    expect(kataDto({})).toStrictEqual(expect.any(Object));
  });
  it('should return an object with kata data', () => {
    expect.assertions(1);
    expect(kataDto({})).toBeKataDto();
  });
});
