import createTrainingRepo from './training';

const mockRepo = () => ({
  getTrainingWithId: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

const mockRepoWithout = (method) => {
  const mock = mockRepo();
  delete mock[method];
  return mock;
};

describe('user repository factory', () => {
  it('should assure that returns an object that implements the interface', () => {
    expect.assertions(1);
    expect(createTrainingRepo(mockRepo())).toBeTrainingRepo();
  });

  it.each([['getTrainingWithId'], ['save'], ['update']])(
    'should throw an error if "%s" function is not provided',
    (method) => {
      expect.assertions(1);
      expect(() => {
        createTrainingRepo(mockRepoWithout(method));
      }).toThrow(`function "${method}" is required for Application Service`);
    }
  );
});
