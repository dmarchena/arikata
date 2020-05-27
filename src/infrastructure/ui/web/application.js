import { createVuexKataRepo } from '../../repos/vuex/kata';
import { store, getters, mutations } from './store';
import browserAuthSession from '../../authSession/browser';
import createApp from '../../../application';
import createComposedAuthSession from '../../../application/factories/authSession/composed';
import createComposedKataRepo from '../../../application/factories/repos/kata/composed';
import createVuexAuthSession from '../../authSession/vuex';
import kataRepo from '../../repos/api/kata';
import trainingRepo from '../../repos/api/training';
import userRepo from '../../repos/api/user';

const app = createApp({
  authSession: createComposedAuthSession(
    createVuexAuthSession(store, getters.auth, mutations.auth),
    browserAuthSession
  ),
  kataRepo: createComposedKataRepo(createVuexKataRepo(store), kataRepo),
  trainingRepo,
  userRepo,
});

export default app;
