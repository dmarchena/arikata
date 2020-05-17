// eslint-disable-next-line
///<reference path="../../../jsdoc-types.js" />

import config from '../../../config.json';

/**
 * Factory function for an AuthSession
 * @param {Object} storage adapter to use an storage
 * @returns {AuthSession}
 */
const createAuthSession = (storage) => ({
  /**
   * Logout. Destroy current session.
   * @returns {undefined}
   */
  discardAuthentication() {
    storage.removeUser();
  },
  /**
   * Get authentication data of signed user
   * @returns {Object} user data plus accessToken. If user is not signed, returns null.
   */
  getAuthentication() {
    return storage.getUser();
  },
  /**
   * Check if authenticated user is an admin
   * @returns {boolean} true if signed user is an admin; otherwise, false.
   */
  isAdmin() {
    const user = storage.getUser();
    return user?.roles?.includes(config.userRoles.admin);
  },
  /**
   * Check if there is authenticated user
   * @returns {boolean} true if user is signed in; otherwise, false.
   */
  isAuthenticated() {
    const user = storage.getUser();
    return !!(user?.accessToken ?? false);
  },
  /**
   * Save authentication data of user
   * @param {Object} user user data plus accessToken
   * @returns {undefined}
   */
  saveAuthentication(user) {
    if (user.accessToken?.length > 0) {
      storage.setUser(user);
    }
  },
});

export default createAuthSession;
