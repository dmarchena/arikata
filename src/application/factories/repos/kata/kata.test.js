import createKataRepo from './kata';
import createComposedKataRepo from './composed';

const mockRepo = () => ({
  getAllKatas: jest.fn(),
  getAllKatasWithTag: jest.fn(),
  getAllTags: jest.fn(),
  getKataWithId: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

const mockRepoWithout = (method) => {
  const mock = mockRepo();
  delete mock[method];
  return mock;
};

describe('kata repository', () => {
  it('should assure that returns an object that implements the interface', () => {
    expect.assertions(1);
    expect(createKataRepo(mockRepo())).toBeKataRepo();
  });

  describe('when is composed repo', () => {
    it('should implements the interface with no transformer', () => {
      expect.assertions(1);
      const composedRepo = createComposedKataRepo(createKataRepo(mockRepo()));
      // add fake transformer to validate by means of matcher without that error
      composedRepo.transformer = {};
      expect(composedRepo).toBeKataRepo();
    });
  });

  it.each([
    ['getAllKatas'],
    ['getAllTags'],
    ['getAllKatasWithTag'],
    ['getKataWithId'],
    ['remove'],
    ['save'],
    ['update'],
  ])('should throw an error if "%s" function is not provided', (method) => {
    expect.assertions(1);
    expect(() => {
      createKataRepo(mockRepoWithout(method));
    }).toThrow(`function "${method}" is required for Application Service`);
  });
});
