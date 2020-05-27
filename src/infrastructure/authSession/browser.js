// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import { createAuthSessionForStorage } from '../../application/factories/authSession';

const localStorageAdapter = {
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  removeUser() {
    localStorage.removeItem('user');
  },
};

const browserAuthSession = createAuthSessionForStorage(localStorageAdapter);

export default browserAuthSession;
