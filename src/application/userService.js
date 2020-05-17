// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import PermissionDeniedError from './exceptions/PermissionDeniedError';
import User from '../domain/user';
import configJson from '../config.json';
import isValidEmail from './validators/email';

/**
 * Factory function for a user application service
 * @param {Object} dependencies
 * @param {UserRepo} dependencies.userRepo
 * @param {AuthSession} dependencies.authSession
 */
const createUserService = ({ authSession, userRepo }) => ({
  /**
   * Change user password
   * @param {string} email user mail
   * @param {string} password new password to set
   * @param {string} [passwordConfirmation] new password confirmation
   * @returns {Promise.<UserResponseDto>}
   */
  changePassword(email, password, passwordConfirmation = false) {
    if (!authSession.isAuthenticated()) {
      throw new PermissionDeniedError(
        'You need to be signed in to call this method.'
      );
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      throw new Error('Password can not be confirmed.');
    }
    const user = User(userRepo).create(undefined, { email, password });
    return userRepo.update(user);
  },

  /**
   * End user session
   * @returns {undefined}
   */
  logout() {
    userRepo.logout(authSession.getAuthentication());
  },

  /**
   * Login the user. Returns true if exists and the pass is correct.
   * @param {string} email new user email
   * @param {string} password password
   * @returns {Promise.<UserResponseDto>} User DTO with role and JSON Web Token
   */
  signin(email, password) {
    const user = User(userRepo).create(undefined, { email, password });
    return userRepo.login(user).then((responseDto) => {
      if (responseDto !== null) {
        authSession.saveAuthentication(responseDto);
        return responseDto;
      }
      return null;
    });
  },

  /**
   * Register a new user. Returns false if user already exist or password typo.
   * @param {string} email new user email
   * @param {string} password password
   * @param {string} [passwordConfirmation] password confirmation to prevent from typos
   * @returns {Promise.<UserResponseDto>} User dto
   */
  signup(email, password, passwordConfirmation) {
    if (!isValidEmail(email)) {
      throw new TypeError(`"${email} is not valid email`);
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      throw new Error('Password can not be confirmed.');
    }
    const user = User(userRepo).create(undefined, {
      email,
      password,
      role: configJson.userRoles.user,
    });
    return userRepo.save(user).then((responseDto) => {
      if (responseDto !== null) {
        authSession.saveAuthentication(responseDto);
        return responseDto;
      }
      return null;
    });
  },
});

export default createUserService;
