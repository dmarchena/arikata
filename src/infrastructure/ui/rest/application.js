import createApp from '../../../application';
import kataRepo from '../../repos/db/kata';
import trainingRepo from '../../repos/db/training';
import userRepo from '../../repos/db/user';
import serverFakeAuthSession from '../../authSession/server';

const app = createApp({
  authSession: serverFakeAuthSession,
  kataRepo,
  trainingRepo,
  userRepo,
});

export default app;
