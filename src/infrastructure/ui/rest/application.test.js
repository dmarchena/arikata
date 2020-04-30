import application from './application';

describe('rest application', () => {
  it('should be an app instance', () => {
    expect.assertions(1);
    expect(application).toBeAppInstance();
  });
});
