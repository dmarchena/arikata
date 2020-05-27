// eslint-disable-next-line
///<reference path="../../jsdoc-types.js" />

import { compose } from 'ramda';
import { createAuthSessionForStorage } from '../../application/factories/authSession';

const vuexAdapter = (store, getters, mutations) => ({
  getUser() {
    return store.getters[getters.getUser];
  },
  setUser(user) {
    store.commit(mutations.setUser, user);
  },
  removeUser() {
    store.commit(mutations.removeUser);
  },
});

/**
 * Factory function for a Vuex base authSession
 *
 * @param {Object} store - Vuex store instance
 * @param {Object} mutations - Vuex store instance
 * @param {string} mutations.setUser - Name of setUser mutation
 * @param {string} mutations.removeUser - Name of removeUser mutation
 * @returns {Object}
 */
const createVuexAuthSession = compose(createAuthSessionForStorage, vuexAdapter);

export default createVuexAuthSession;
