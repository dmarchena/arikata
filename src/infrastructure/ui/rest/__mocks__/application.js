import faker from 'faker';

import createApp from '../../../../application';
import kataRepo from '../../../repos/__mocks__/kata';
import userRepo from '../../../repos/__mocks__/user';
import serverMemoryAuthSession from '../../../authSession/serverMemory';

import mockJson from '../../../../mock.json';

const authSession = serverMemoryAuthSession;
authSession.saveAuthentication({
  ...mockJson.users.admin,
  accessToken: faker.random.alphaNumeric(100),
});

const app = createApp({
  authSession,
  kataRepo,
  userRepo,
});

export default app;
