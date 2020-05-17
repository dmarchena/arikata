import createApp from '../../../application';
import kataRepo from '../../repos/db/kata';
import userRepo from '../../repos/db/user';
import serverMemoryAuthSession from '../../authSession/serverMemory';

const app = createApp({
  authSession: serverMemoryAuthSession,
  kataRepo,
  userRepo,
});

export default app;
