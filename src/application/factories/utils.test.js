import { isRequired } from './utils';

describe('isRequired', () => {
  it('should throw an error', () => {
    expect.assertions(1);
    expect(() => {
      isRequired('test');
    }).toThrow('function "test" is required for Application Service');
  });
});
