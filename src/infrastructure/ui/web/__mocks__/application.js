import { createVuexKataRepo } from '../../../repos/vuex/kata';
import { store } from '../store';
import browserAuthSession from '../../../authSession/browser';
import createApp from '../../../../application';
import createComposedKataRepo from '../../../../application/factories/repos/kata/composed';
import kataRepo from '../../../repos/__mocks__/kata';
import trainingRepo from '../../../repos/__mocks__/training';
import userRepo from '../../../repos/__mocks__/user';

const app = createApp({
  authSession: browserAuthSession,
  kataRepo: createComposedKataRepo(createVuexKataRepo(store), kataRepo),
  trainingRepo,
  userRepo,
});

export default app;
