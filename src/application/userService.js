// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import AuthError from './exceptions/AuthError';
import NotFoundError from './exceptions/NotFoundError';
import PermissionDeniedError from './exceptions/PermissionDeniedError';
import User from '../domain/user';
import configJson from '../config.json';
import isValidEmail from './validators/email';
import isEmpty from './validators/empty';

const checkUserNotFound = (user) => {
  if (user === null) {
    return Promise.reject(new NotFoundError('User does not exists'));
  }
  return user;
};

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
      return Promise.reject(
        new PermissionDeniedError(
          'You need to be signed in to call this method.'
        )
      );
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      return Promise.reject(new Error('Password can not be confirmed.'));
    }
    const user = User(userRepo).create(undefined, { email, password });
    return userRepo.update(user).then(checkUserNotFound);
  },

  /**
   * Login the user.
   * @param {string} email new user email
   * @param {string} password password
   * @returns {Promise.<UserResponseDto>} User DTO with role and JSON Web Token
   */
  signIn(email, password) {
    if (!isValidEmail(email)) {
      return Promise.reject(
        new TypeError(`"${email}" is not a valid email address`)
      );
    }
    if (isEmpty(password)) {
      return Promise.reject(new TypeError('You must introduce a password'));
    }
    const user = User(userRepo).create(undefined, { email, password });
    return userRepo
      .signIn(user)
      .then(checkUserNotFound)
      .then((responseDto) => {
        authSession.saveAuthentication(responseDto);
        return responseDto;
      });
  },

  /**
   * End user session
   * @returns {undefined}
   */
  signOut() {
    userRepo.signOut(authSession.getAuthentication());
    authSession.discardAuthentication();
  },

  /**
   * Register a new user. Returns false if user already exist or password typo.
   * @param {string} email new user email
   * @param {string} password password
   * @param {string} [passwordConfirmation] password confirmation to prevent from typos
   * @returns {Promise.<UserResponseDto>} User dto
   */
  signUp(email, password, passwordConfirmation) {
    if (!isValidEmail(email)) {
      return Promise.reject(new TypeError(`"${email}" is not valid email`));
    }
    if (isEmpty(password)) {
      return Promise.reject(new TypeError('You must introduce a password'));
    }
    if (arguments.length > 2 && password !== passwordConfirmation) {
      return Promise.reject(new Error('Passwords do not match.'));
    }
    const user = User(userRepo).create(undefined, {
      email,
      password,
      roles: [configJson.userRoles.user],
    });
    return userRepo
      .signUp(user)
      .then((responseDto) => {
        if (responseDto !== null) {
          authSession.saveAuthentication(responseDto);
          return responseDto;
        }
        return Promise.reject(
          new AuthError(
            'It has been impossible to register this email. It seems that the user already exists.'
          )
        );
      })
      .catch(() => {
        return Promise.reject(
          new AuthError(
            'It has been impossible to register this email. It seems that the user already exists.'
          )
        );
      });
  },
});

export default createUserService;
