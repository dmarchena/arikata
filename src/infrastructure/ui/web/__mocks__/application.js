import browserAuthSession from '../../../authSession/browser';
import createApp from '../../../../application';
import kataRepo from '../../../repos/__mocks__/kata';
import userRepo from '../../../repos/__mocks__/user';

const app = createApp({
  authSession: browserAuthSession,
  kataRepo,
  userRepo,
});

export default app;
