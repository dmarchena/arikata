import createKataRepo from './kata';

describe('kata repository', () => {
  it('should assure that returns an object that implements the interface', () => {
    expect.assertions(1);
    const mock = jest.fn();
    expect(createKataRepo(mock, mock, mock)).toStrictEqual(
      expect.objectContaining({
        allKatas: expect.any(Function),
        katasOfTag: expect.any(Function),
        save: expect.any(Function),
      })
    );
  });
  it('should throw an error if some functions are not provided', () => {
    expect.assertions(3);
    const mock = jest.fn();
    expect(() => {
      createKataRepo();
    }).toThrow('function "allKatas" is required for Application Service');
    expect(() => {
      createKataRepo(mock);
    }).toThrow('function "katasOfTag" is required for Application Service');
    expect(() => {
      createKataRepo(mock, mock);
    }).toThrow('function "save" is required for Application Service');
  });
});
