import application from './application';

jest.mock('../../repos/db/kata');
jest.mock('../../repos/db/training');
jest.mock('../../repos/db/user');

describe('web application', () => {
  it('should be an app instance', () => {
    expect.assertions(1);
    expect(application).toBeAppInstance();
  });
});
