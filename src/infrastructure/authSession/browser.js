// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import createAuthSession from '../../application/factories/authSession';

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

const browserAuthSession = createAuthSession(localStorageAdapter);

export default browserAuthSession;
