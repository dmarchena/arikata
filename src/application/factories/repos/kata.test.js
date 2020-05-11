import createKataRepo from './kata';

const mockRepo = () => ({
  getAllKatas: jest.fn(),
  getAllKatasWithTag: jest.fn(),
  getAllTags: jest.fn(),
  getKataWithId: jest.fn(),
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

  it.each([
    ['getAllKatas'],
    ['getAllTags'],
    ['getAllKatasWithTag'],
    ['getKataWithId'],
    ['save'],
    ['update'],
  ])('should throw an error if "%s" function is not provided', (method) => {
    expect.assertions(1);
    expect(() => {
      createKataRepo(mockRepoWithout(method));
    }).toThrow(`function "${method}" is required for Application Service`);
  });
});
