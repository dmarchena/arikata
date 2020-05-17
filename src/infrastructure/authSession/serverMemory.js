// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import createAuthSession from '../../application/factories/authSession';

const serverMemoryStorageAdapter = {
  user: null,
  getUser() {
    return this.user;
  },
  setUser(user) {
    this.user = user;
  },
  removeUser() {
    this.user = null;
  },
};

const serverMemoryAuthSession = createAuthSession(serverMemoryStorageAdapter);

export default serverMemoryAuthSession;
