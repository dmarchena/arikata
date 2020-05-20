// eslint-disable-next-line
///<reference path="../../../jsdoc-types.js" />

import { isRequired } from '../utils';
import { createUserTransformer } from '../../transformers/userTransformer';

/**
 * Factory function for a kata repository
 * @returns {UserRepo}
 */
function createUserRepo({
  signIn = isRequired('signIn'),
  signOut = isRequired('signOut'),
  signUp = isRequired('signUp'),
  update = isRequired('update'),
}) {
  return {
    transformer: createUserTransformer({ repo: this }),

    /**
     * Login the user. Returns null if it does not exists or the pass is not correct.
     * @param {UserAggregate} user
     * @returns {Promise.<UserAggregate>}
     */
    signIn(user) {
      return signIn(this.transformer.toUserDto(user, false)).then((data) =>
        data === null ? null : this.transformer.toUserDto(data, true)
      );
    },

    /**
     * End user session
     * @param {UserAggregate} user
     * @returns {undefined>}
     */
    signOut(user) {
      signOut(this.transformer.toUserDto(user, false));
    },

    /**
     * Save new user. Returns false if user already exist.
     * @param {UserAggregate} user
     * @returns {Promise.<UserAggregate>}
     */
    signUp(user) {
      return signUp(this.transformer.toUserDto(user, false)).then((data) =>
        data === null ? null : this.transformer.toUserDto(data, true)
      );
    },

    /**
     * Updates user data.
     * @param {UserAggregate} user
     * @returns {Promise.<UserAggregate>}
     */
    update(user) {
      return update(this.transformer.toUserDto(user, false)).then((data) =>
        data === null ? null : this.transformer.toUserDto(data, true)
      );
    },
  };
}

export default createUserRepo;
