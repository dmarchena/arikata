// eslint-disable-next-line
///<reference path="../jsdoc-types.js" />

import BadRequestError from './exceptions/BadRequestError';
import ConflictError from './exceptions/ConflictError';
import NotFoundError from './exceptions/NotFoundError';
import UnauthorizedError from './exceptions/UnauthorizedError';
import User from '../domain/user';
import configJson from '../config.json';
import isValidEmail from './validators/email';
import { isEmptyString } from './validators/empty';
import { userTransformer } from './transformers/userTransformer';

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
        new UnauthorizedError('You need to be signed in to call this method.')
      );
    }
    if (passwordConfirmation && password !== passwordConfirmation) {
      return Promise.reject(new Error('Password can not be confirmed.'));
    }
    const user = User(userRepo).create(undefined, { email, password });
    return userRepo
      .update(user)
      .then(checkUserNotFound)
      .then((result) => userTransformer.toUserDto(result, true));
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
        new BadRequestError(`"${email}" is not a valid email address`)
      );
    }
    if (isEmptyString(password)) {
      return Promise.reject(
        new BadRequestError('You must introduce a password')
      );
    }
    const user = User(userRepo).create(undefined, { email, password });
    return userRepo
      .signIn(user)
      .then(checkUserNotFound)
      .then((result) => {
        const dto = userTransformer.toUserDto(result, true);
        authSession.saveAuthentication(dto);
        return dto;
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
      return Promise.reject(
        new BadRequestError(`"${email}" is not valid email`)
      );
    }
    if (isEmptyString(password)) {
      return Promise.reject(
        new BadRequestError('You must introduce a password')
      );
    }
    if (arguments.length > 2 && password !== passwordConfirmation) {
      return Promise.reject(new BadRequestError('Passwords do not match.'));
    }
    const user = User(userRepo).create(undefined, {
      email,
      password,
      roles: [configJson.userRoles.user],
    });
    return userRepo
      .signUp(user)
      .then((result) => {
        if (result !== null) {
          const dto = userTransformer.toUserDto(result, true);
          authSession.saveAuthentication(dto);
          return dto;
        }
        return Promise.reject(
          new ConflictError(
            'It has been impossible to register this email. It seems that the user already exists.'
          )
        );
      })
      .catch(() => {
        return Promise.reject(
          new ConflictError(
            'It has been impossible to register this email. It seems that the user already exists.'
          )
        );
      });
  },
});

export default createUserService;
