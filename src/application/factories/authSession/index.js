// eslint-disable-next-line
///<reference path="../../../jsdoc-types.js" />

import { is } from 'ramda';
import config from '../../../config.json';
import { isRequired } from '../utils';

/**
 * Factory function for an AuthSession
 * @param {Object} functions required functions
 * @returns {AuthSession}
 */
const createAuthSession = ({
  discardAuthentication = isRequired('discardAuthentication'),
  getAuthentication = isRequired('getAuthentication'),
  isAdmin = isRequired('isAdmin'),
  isAuthenticated = isRequired('isAuthenticated'),
  isUser = isRequired('isUser'),
  saveAuthentication = isRequired('saveAuthentication'),
}) => ({
  /**
   * Logout. Destroy current session.
   * @returns {undefined}
   */
  discardAuthentication,
  /**
   * Get authentication data of signed user
   * @returns {UserResponseDto} user data plus accessToken. If user is not signed, returns null.
   */
  getAuthentication,
  /**
   * Check if authenticated user is an admin
   * @returns {boolean} true if signed user is an admin; otherwise, false.
   */
  isAdmin,
  /**
   * Check if there is authenticated user
   * @returns {boolean} true if user is signed in; otherwise, false.
   */
  isAuthenticated,
  /**
   * Check if authenticated user is the given one
   * @param {UserRequestDto|string} user User dto or user Id
   * @returns {boolean} true if it is signed user; otherwise, false.
   */
  isUser,
  /**
   * Save authentication data of user
   * @param {UserResponseDto} user user data plus accessToken
   * @returns {undefined}
   */
  saveAuthentication,
});

/**
 * Factory function for an AuthSession
 * @param {Object} storage adapter to use an storage
 * @returns {AuthSession}
 */
const createAuthSessionForStorage = (storage) =>
  createAuthSession({
    discardAuthentication() {
      storage.removeUser();
    },
    getAuthentication() {
      return storage.getUser();
    },
    isAdmin() {
      const user = storage.getUser();
      return user?.roles?.includes(config.userRoles.admin);
    },
    isAuthenticated() {
      const user = storage.getUser();
      return !!(user?.accessToken ?? false);
    },
    isUser(user) {
      const userId = is(String)(user) ? user : user?.id;
      const signedInUser = storage.getUser();
      return userId && signedInUser?.id === userId;
    },
    saveAuthentication(user) {
      if (user.accessToken?.length > 0) {
        storage.setUser(user);
      } else {
        storage.removeUser();
      }
    },
  });

export { createAuthSession, createAuthSessionForStorage };
