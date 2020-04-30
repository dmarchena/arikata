import application from './application';

describe('web application', () => {
  it('should be an app instance', () => {
    expect.assertions(1);
    expect(application).toBeAppInstance();
  });
});
