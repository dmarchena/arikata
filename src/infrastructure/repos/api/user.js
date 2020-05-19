import { identity } from 'ramda';
import Axios from 'axios';

import createUserRepo from '../../../application/factories/repos/user';
import { authHeader } from './utils';

const endpoints = {
  signin: '/api/user/signin',
  signup: '/api/user/signup',
  update: (id) => `/api/user/${id}`,
};

const responseData = (response) =>
  response.status >= 300 ? null : response.data;

const login = (user) => Axios.post(endpoints.signin, user).then(responseData);

const save = (user) => Axios.post(endpoints.signup, user).then(responseData);

const update = (user) =>
  Axios.put(
    endpoints.update(user.id),
    {
      email: user.email,
      password: user.password,
    },
    { headers: authHeader() }
  ).then(responseData);

const userRepo = createUserRepo({
  login,
  logout: identity,
  save,
  update,
});

export default userRepo;
