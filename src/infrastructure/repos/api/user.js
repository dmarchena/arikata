import { identity } from 'ramda';

import { createHttpClient } from './utils';
import createUserRepo from '../../../application/factories/repos/user';

const endpoints = {
  signIn: '/api/user/signin',
  signUp: '/api/user/signup',
  update: (id) => `/api/user/${id}`,
};

const request = createHttpClient();

const signIn = (user) => request.post(endpoints.signIn, user);

const signUp = (user) => request.post(endpoints.signUp, user);

const update = (user) =>
  request.put(endpoints.update(user.id), {
    email: user.email,
    password: user.password,
  });

const userRepo = createUserRepo({
  signIn,
  signOut: identity,
  signUp,
  update,
});

export default userRepo;
