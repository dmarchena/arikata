import browserAuthSession from '../../authSession/browser';
import createApp from '../../../application';
import kataRepo from '../../repos/api/kata';
import userRepo from '../../repos/api/user';

const app = createApp({
  authSession: browserAuthSession,
  kataRepo,
  userRepo,
});

export default app;
