import createApp from './index';
import kataRepo from '../infrastructure/repos/__mocks__/kata';

describe('createApp', () => {
  it('should return an app instance', () => {
    expect.assertions(1);
    expect(createApp({ kataRepo })).toBeAppInstance();
  });
});
