import encryption from './index';

describe('encryption', () => {
  it('should encrypt', () => {
    expect.hasAssertions();
    const pass = 'qwerty1234';
    expect(encryption.encryptPassword(pass)).not.toStrictEqual(pass);
  });

  it('should not give equal results for two different encryption', () => {
    expect.hasAssertions();
    const pass = 'qwerty1234';
    expect(encryption.encryptPassword(pass)).not.toStrictEqual(
      encryption.encryptPassword(pass)
    );
  });

  it('should compare', () => {
    expect.hasAssertions();
    const pass = 'qwerty1234';
    const encoded1 = encryption.encryptPassword(pass);
    const encoded2 = encryption.encryptPassword(pass);
    expect(encryption.comparePassword(pass, encoded1)).toBe(true);
    expect(encryption.comparePassword(pass, encoded2)).toBe(true);
    expect(encoded1).not.toStrictEqual(encoded2);
    expect(encryption.comparePassword('newQwerty4321', encoded1)).toBe(false);
  });
});
