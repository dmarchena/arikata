import createApp from './index';

describe('createApp', () => {
  it('should return an app instance', () => {
    expect.assertions(1);
    expect(createApp({ kataRepo: {} })).toBeAppInstance();
  });
});
