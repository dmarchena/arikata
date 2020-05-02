import application from './application';

jest.mock('../../repos/db/kata');

describe('rest application', () => {
  it('should be an app instance', () => {
    expect.assertions(1);
    expect(application).toBeAppInstance();
  });
});
