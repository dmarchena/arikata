import createApp from '../../../../application';
import kataRepo from '../../../repos/__mocks__/kata';
import trainingRepo from '../../../repos/__mocks__/training';
import userRepo from '../../../repos/__mocks__/user';
import serverFakeAuthSession from '../../../authSession/server';

const app = createApp({
  authSession: serverFakeAuthSession,
  kataRepo,
  trainingRepo,
  userRepo,
});

export default app;
