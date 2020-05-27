import { createAuthSession } from '.';
import { composedSetter, composedGetter } from '../utils';

const createComposedAuthSession = (...authSessions) =>
  createAuthSession({
    /**
     * Logout. Destroy current session.
     * @returns {undefined}
     */
    discardAuthentication: composedSetter(
      authSessions,
      'discardAuthentication'
    ),
    /**
     * Get authentication data of signed user
     * @returns {Object} user data plus accessToken. If user is not signed, returns null.
     */
    getAuthentication: composedGetter(authSessions, 'getAuthentication', null),
    /**
     * Check if authenticated user is an admin
     * @returns {boolean} true if signed user is an admin; otherwise, false.
     */
    isAdmin: composedGetter(authSessions, 'isAdmin'),
    /**
     * Check if authenticated user is the given one
     * @param {UserRequestDto|string} user User dto or user Id
     * @returns {boolean} true if it is signed user; otherwise, false.
     */
    isUser: composedGetter(authSessions, 'isUser'),
    /**
     * Check if there is authenticated user
     * @returns {boolean} true if user is signed in; otherwise, false.
     */
    isAuthenticated: composedGetter(authSessions, 'isAuthenticated'),
    /**
     * Save authentication data of user
     * @param {Object} user user data plus accessToken
     * @returns {undefined}
     */
    saveAuthentication: composedSetter(authSessions, 'saveAuthentication'),
  });

export default createComposedAuthSession;
