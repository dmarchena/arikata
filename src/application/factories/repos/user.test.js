import createUserRepo from './user';

const mockRepo = () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  signUp: jest.fn(),
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
    expect(createUserRepo(mockRepo())).toBeUserRepo();
  });

  it.each([['signIn'], ['signOut'], ['signUp'], ['update']])(
    'should throw an error if "%s" function is not provided',
    (method) => {
      expect.assertions(1);
      expect(() => {
        createUserRepo(mockRepoWithout(method));
      }).toThrow(`function "${method}" is required for Application Service`);
    }
  );
});
