import { comparePassword, encryptPassword } from './index';

describe('encryption', () => {
  it('should encrypt', () => {
    expect.hasAssertions();
    const pass = 'qwerty1234';
    expect(encryptPassword(pass)).not.toStrictEqual(pass);
  });

  it('should not give equal results for two different encryption', () => {
    expect.hasAssertions();
    const pass = 'qwerty1234';
    expect(encryptPassword(pass)).not.toStrictEqual(encryptPassword(pass));
  });

  it('should compare', () => {
    expect.hasAssertions();
    const pass = 'qwerty1234';
    const encoded1 = encryptPassword(pass);
    const encoded2 = encryptPassword(pass);
    expect(comparePassword(pass, encoded1)).toBe(true);
    expect(comparePassword(pass, encoded2)).toBe(true);
    expect(encoded1).not.toStrictEqual(encoded2);
    expect(comparePassword('newQwerty4321', encoded1)).toBe(false);
  });
});
