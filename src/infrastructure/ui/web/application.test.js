import application from './application';

jest.mock('../../repos/api/kata');

describe('web application', () => {
  it('should be an app instance', () => {
    expect.assertions(1);
    expect(application).toBeAppInstance();
  });
});
